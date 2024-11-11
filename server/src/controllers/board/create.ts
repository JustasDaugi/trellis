import { boardSchema, type BoardPublic } from '@server/entities/board'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { boardRepository } from '@server/repositories/boardRepository'

export default authenticatedProcedure
  .use(provideRepos({ boardRepository }))

  .input(
    boardSchema.pick({
      title: true,
    })
  )

  .mutation(
    async ({
      input: board,
      ctx: { authUser, repos },
    }): Promise<BoardPublic> => {
      const newBoard = {
        ...board,
        userId: authUser.id,
      }

      const createdBoard = await repos.boardRepository.create(newBoard)

      return createdBoard
    }
  )
