import type { Database } from '@server/database'
import { boardKeysPublic } from '@server/entities/board'
import type {
  BoardTemplatePublic,
  ListTemplatePublic,
  CardTemplatePublic,
} from '@server/entities/templates'
import {
  boardTemplateKeysPublic,
  listTemplateKeysPublic,
  cardTemplateKeysPublic,
} from '@server/entities/templates'
import { sql } from 'kysely'

export function templateRepository(db: Database) {
  return {
    async findBoardTemplate(
      id: number
    ): Promise<BoardTemplatePublic | undefined> {
      return db
        .selectFrom('boardTemplate')
        .select(boardTemplateKeysPublic)
        .where('id', '=', id)
        .executeTakeFirst()
    },

    async findListTemplates(
      boardTemplateId: number
    ): Promise<ListTemplatePublic[]> {
      return db
        .selectFrom('listTemplate')
        .select(listTemplateKeysPublic)
        .where('boardId', '=', boardTemplateId)
        .orderBy('order')
        .execute()
    },

    async findCardTemplates(
      listTemplateId: number
    ): Promise<CardTemplatePublic[]> {
      return db
        .selectFrom('cardTemplate')
        .select(cardTemplateKeysPublic)
        .where('listId', '=', listTemplateId)
        .orderBy('order')
        .execute()
    },
    async copyBoard(boardTemplateId: number, userId: number) {
      return db
        .insertInto('board')
        .columns(boardKeysPublic)
        .expression(
          db.selectFrom('boardTemplate')
            .select(boardTemplateKeysPublic)
            .select(sql`${userId}`.as('userId'))
            .where('id', '=', boardTemplateId)
        )
        .returning('id')
        .executeTakeFirst()
    },

    async copyList(listTemplateId: number, boardId: number, userId: number) {
      return db
        .insertInto('list')
        .columns(['title', 'order', 'boardId', 'userId'])
        .expression(
          db.selectFrom('listTemplate')
            .select(['title', 'order'])
            .select(sql`${boardId}`.as('boardId'))
            .select(sql`${userId}`.as('userId'))
            .where('id', '=', listTemplateId)
        )
        .returning('id')
        .executeTakeFirst()
    },

    async copyCard(cardTemplateId: number, listId: number, userId: number) {
      return db
        .insertInto('card')
        .columns(['title', 'order', 'description', 'listId', 'userId'])
        .expression(
          db.selectFrom('cardTemplate')
            .select(['title', 'order', 'description'])
            .select(sql`${listId}`.as('listId'))
            .select(sql`${userId}`.as('userId'))
            .where('id', '=', cardTemplateId)
        )
        .returning('id')
        .executeTakeFirst()
    },
  }
}

export type TemplateRepository = ReturnType<typeof templateRepository>
