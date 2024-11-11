import { createCallerFactory } from '@server/trpc'
import { authContext } from '@tests/utils/context'
import {
  fakeBoard,
  fakeList,
  fakeCard,
  fakeUser,
} from '@server/entities/tests/fakes'
import { insertAll } from '@tests/utils/records'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { createTestDatabase } from '@tests/utils/database'
import cardRouter from '..'

const createCaller = createCallerFactory(cardRouter)
const db = await wrapInRollbacks(createTestDatabase())

describe('card create', async () => {
  const [listOwner, otherUser] = await insertAll(db, 'user', [
    fakeUser(),
    fakeUser(),
  ])

  const [board] = await insertAll(
    db,
    'board',
    fakeBoard({
      userId: listOwner.id,
    })
  )

  const [list] = await insertAll(
    db,
    'list',
    fakeList({
      boardId: board.id,
      userId: listOwner.id,
    })
  )

  describe('permissions', () => {
    const card = fakeCard({
      listId: list.id,
    })

    it('allows list owner to create a card', async () => {
      // ARRANGE
      const { create } = createCaller(authContext({ db }, listOwner))

      // ACT & ASSERT
      await expect(
        create({
          listId: card.listId,
          title: card.title,
          description: card.description,
        })
      ).resolves.toMatchObject({
        listId: list.id,
        title: card.title,
        description: card.description,
      })
    })

    it('disallows other users from creating a card', async () => {
      // ARRANGE
      const { create } = createCaller(authContext({ db }, otherUser))

      // ACT & ASSERT
      await expect(
        create({
          listId: card.listId,
          title: card.title,
          description: card.description,
        })
      ).rejects.toThrow(/not authorized/i)
    })

    it('disallows non-logged in users to create a card', async () => {
      // ARRANGE
      const { create } = createCaller({
        db,
        req: {
          header: () => undefined,
        } as any,
      })

      // ACT & ASSERT
      await expect(
        create({
          listId: card.listId,
          title: card.title,
          description: card.description,
        })
      ).rejects.toThrow(/unauthenticated|unauthorized/i)
    })
  })

  it('throws an error if the list does not exist', async () => {
    // ARRANGE
    const card = fakeCard({
      listId: list.id + 999999,
    })

    // ACT & ASSERT
    const { create } = createCaller(authContext({ db }, listOwner))
    await expect(
      create({
        listId: card.listId,
        title: card.title,
        description: card.description,
      })
    ).rejects.toThrow(/not found/i)
  })
})
