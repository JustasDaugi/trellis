import { fakeBoard, fakeUser } from '@server/entities/tests/fakes'
import { createTestDatabase } from '@tests/utils/database'
import { createCallerFactory } from '@server/trpc'
import { wrapInRollbacks } from '@tests/utils/transactions'
import { clearTables, insertAll } from '@tests/utils/records'
import boardRouter from '..'

const createCaller = createCallerFactory(boardRouter)
const db = await wrapInRollbacks(createTestDatabase())

await clearTables(db, ['board'])
const [user] = await insertAll(db, 'user', fakeUser())

const { findAll } = createCaller({ db })

it('should return an empty list if there are no boards', async () => {
  // ARRANGE & ACT
  const result = await findAll()

  // ASSERT
  expect(result).toHaveLength(0)
})

it('should return a list of boards with default pagination', async () => {
  // ARRANGE
  await insertAll(db, 'board', [fakeBoard({ userId: user.id })])

  // ACT
  const boards = await findAll()

  // ASSERT
  expect(boards).toHaveLength(1)
})

it('should respect pagination parameters', async () => {
  // ARRANGE
  const [anotherUser] = await insertAll(db, 'user', fakeUser())
  const boards = [
    fakeBoard({ userId: anotherUser.id }),
    fakeBoard({ userId: anotherUser.id }),
    fakeBoard({ userId: anotherUser.id }),
  ]
  await insertAll(db, 'board', boards)

  // ACT
  const result = await findAll({
    offset: 0,
    limit: 3,
  })

  // ASSERT
  expect(result).toHaveLength(3)
})

it('should return the latest board first', async () => {
  // ARRANGE
  const [boardOld] = await insertAll(db, 'board', [
    fakeBoard({ userId: user.id }),
  ])
  const [boardNew] = await insertAll(db, 'board', [
    fakeBoard({ userId: user.id }),
  ])

  // ACT
  const boards = await findAll()

  // ASSERT
  expect(boards[0]).toMatchObject(boardNew)
  expect(boards[1]).toMatchObject(boardOld)
})
