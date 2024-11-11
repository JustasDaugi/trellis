import { cardSchema, type CardPublic } from '@server/entities/card'
import { cardRepository } from '@server/repositories/cardRepository'
import { listRepository } from '@server/repositories/listRepository'
import provideRepos from '@server/trpc/provideRepos'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import NotFoundError from '@server/utils/errors/NotFound'
import ForbiddenError from '@server/utils/errors/Forbidden'

export default authenticatedProcedure
  .use(
    provideRepos({
      listRepository,
      cardRepository,
    })
  )
  .input(
    cardSchema
      .pick({
        listId: true,
        title: true,
        description: true,
      })
      .partial({ description: true })
  )
  .mutation(
    async ({ input: card, ctx: { repos, authUser } }): Promise<CardPublic> => {
      const list = await repos.listRepository.findById(card.listId)

      if (!list) {
        throw new NotFoundError('List not found')
      }
      if (list.userId !== authUser.id) {
        throw new ForbiddenError(
          'You are not authorized to create a card in this list'
        )
      }

      const newCard = await repos.cardRepository.create({
        ...card,
        userId: authUser.id,
      })

      return newCard
    }
  )
