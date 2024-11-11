import { z } from 'zod'
import type { Selectable } from 'kysely'
import type { Board } from '@server/database/types'
import { idSchema } from './shared'

export const boardSchema = z.object({
  id: idSchema,
  title: z.string().min(1).max(500),
  imageId: z.string().nullable(),
  imageThumbUrl: z.string().nullable(),
  imageFullUrl: z.string().nullable(),
  imageUserName: z.string().nullable(),
  imageLinkHtml: z.string().nullable(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
  userId: idSchema,
})

export const boardKeysAll = Object.keys(
  boardSchema.shape
) as (keyof Board)[]

export const boardKeysPublic = boardKeysAll

export type BoardPublic = Pick<
  Selectable<Board>,
  (typeof boardKeysPublic)[number]
>
