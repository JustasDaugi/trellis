import { boardRepository } from '@server/repositories/boardRepository'
import { publicProcedure } from '@server/trpc'
import provideRepos from '@server/trpc/provideRepos'
import { z } from 'zod'

const POSTGRES_INT_MAX = 2147483647

export default publicProcedure
  .use(
    provideRepos({
      boardRepository,
    })
  )
  .input(
    z
      .object({
        offset: z.number().int().min(0).max(POSTGRES_INT_MAX).default(0),
        limit: z.number().int().min(1).max(100).default(20),
      })
      .default({})
  )
  .query(async ({ input: { limit, offset }, ctx: { repos } }) => {
    const board = await repos.boardRepository.findAll(limit, offset)

    return board
  })
