import { createCallerFactory } from '@server/trpc'
import { authContext } from '@tests/utils/context'
import { fakeBoard, fakeList, fakeUser } from '@server/entities/tests/fakes'
import { insertAll } from '@tests/utils/records'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { createTestDatabase } from '@tests/utils/database'
import listRouter from '..'

const createCaller = createCallerFactory(listRouter)
const db = await wrapInRollbacks(createTestDatabase())

const [boardOwner, otherUser] = await insertAll(db, 'user', [
  fakeUser(),
  fakeUser(),
])
const [board] = await insertAll(
  db,
  'board',
  fakeBoard({
    userId: boardOwner.id,
  })
)

it('throws an error if the board does not exist', async () => {
  // ARRANGE
  const list = fakeList({
    boardId: board.id + 999999,
  })

  // ACT & ASSERT
  const { create } = createCaller(authContext({ db }, boardOwner))
  await expect(
    create({
      boardId: list.boardId,
      title: list.title,
    })
  ).rejects.toThrow(/not found/i)
})

describe('permissions', () => {
  const list = fakeList({
    boardId: board.id,
  })

  it('allows board owner to create a list', async () => {
    // ARRANGE
    const { create } = createCaller(authContext({ db }, boardOwner))

    // ACT & ASSERT
    await expect(
      create({
        boardId: list.boardId,
        title: list.title,
      })
    ).resolves.toMatchObject({
      boardId: board.id,
      title: list.title,
    })
  })

  it('disallows other users from creating a list', async () => {
    // ARRANGE
    const { create } = createCaller(authContext({ db }, otherUser))

    // ACT & ASSERT
    await expect(
      create({
        boardId: list.boardId,
        title: list.title,
      })
    ).rejects.toThrow(/not authorized/i)
  })

  it('disallows non-logged in users to create a list', async () => {
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
        boardId: list.boardId,
        title: list.title,
      })
    ).rejects.toThrow(/unauthenticated|unauthorized/i)
  })
})
