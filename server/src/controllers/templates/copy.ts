import { z } from 'zod'
import { authenticatedProcedure } from '@server/trpc/authenticatedProcedure'
import provideRepos from '@server/trpc/provideRepos'
import { templateRepository } from '@server/repositories/templateRepository'
import { type BoardPublic } from '@server/entities/board'

export default authenticatedProcedure
  .use(provideRepos({ templateRepository }))
  .input(
    z.object({
      boardTemplateId: z.number(),
    })
  )
  .mutation(async ({ input, ctx: { authUser, repos } }): Promise<BoardPublic> => {
    const userId = authUser.id
    const { boardTemplateId } = input
    
    const copiedBoard = await repos.templateRepository.copyBoard(boardTemplateId, userId)
    if (!copiedBoard) {
      throw new Error('Failed to copy board template.')
    }
    const newBoardId = copiedBoard.id

    const listTemplates = await repos.templateRepository.findListTemplates(boardTemplateId)

    const copiedLists = await Promise.all(
      listTemplates.map(async (listTemplate) => {
        const copiedList = await repos.templateRepository.copyList(
          listTemplate.id,
          newBoardId,
          userId
        )
        if (!copiedList) {
          throw new Error(`Failed to copy list template with ID ${listTemplate.id}.`)
        }
        const newListId = copiedList.id

        const cardTemplates = await repos.templateRepository.findCardTemplates(listTemplate.id)
        const copiedCards = await Promise.all(
          cardTemplates.map(async (cardTemplate) => {
            const copiedCard = await repos.templateRepository.copyCard(
              cardTemplate.id,
              newListId,
              userId
            )
            if (!copiedCard) {
              throw new Error(`Failed to copy card template with ID ${cardTemplate.id}.`)
            }
            return copiedCard
          })
        )

        return {
          ...copiedList,
          cards: copiedCards,
        }
      })
    )

    console.log('Copied Lists:', copiedLists)

    const createdBoard = await repos.templateRepository.findBoard(newBoardId)
    if (!createdBoard) {
      throw new Error('Failed to retrieve the newly created board.')
    }

    return createdBoard as BoardPublic
  })
