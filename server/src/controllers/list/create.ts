import { listSchema, type ListPublic } from '@server/entities/list'
import { listRepository } from '@server/repositories/listRepository'
import { boardRepository } from '@server/repositories/boardRepository'
import provideRepos from '@server/trpc/provideRepos'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import NotFoundError from '@server/utils/errors/NotFound'
import ForbiddenError from '@server/utils/errors/Forbidden'

export default authenticatedProcedure
  .use(
    provideRepos({
      boardRepository,
      listRepository,
    })
  )
  .input(
    listSchema.pick({
      boardId: true,
      title: true,
    })
  )
  .mutation(
    async ({ input: list, ctx: { authUser, repos } }): Promise<ListPublic> => {
      const board = await repos.boardRepository.findById(list.boardId)

      if (!board) {
        throw new NotFoundError('Board not found')
      }
      if (board.userId !== authUser.id) {
        throw new ForbiddenError(
          'You are not authorized to create a list in this board'
        )
      }

      const newList = await repos.listRepository.create({
        ...list,
        userId: authUser.id,
      })

      return newList
    }
  )
