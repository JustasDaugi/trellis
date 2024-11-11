import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('board_template')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity().notNull()
    )
    .addColumn('title', 'text', (c) => c.notNull())
    .addColumn('imageId', 'text')
    .addColumn('imageThumbUrl', 'text')
    .addColumn('imageFullUrl', 'text')
    .addColumn('imageUserName', 'text')
    .addColumn('imageLinkHTML', 'text')
    .addColumn('createdAt', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()

  await db.schema
    .createTable('list_template')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity().notNull()
    )
    .addColumn('title', 'text', (c) => c.notNull())
    .addColumn('order', 'integer')
    .addColumn('boardId', 'integer', (c) =>
      c.references('board_template.id').onDelete('cascade').notNull()
    )
    .addColumn('createdAt', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()

  await db.schema
    .createTable('card_template')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity().notNull()
    )
    .addColumn('title', 'text', (c) => c.notNull())
    .addColumn('order', 'integer')
    .addColumn('description', 'text')
    .addColumn('listId', 'integer', (c) =>
      c.references('list_template.id').onDelete('cascade').notNull()
    )
    .addColumn('createdAt', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()

  await db.schema
    .createIndex('idx_list_template_boardId')
    .on('list_template')
    .column('boardId')
    .execute()

  await db.schema
    .createIndex('idx_card_template_listId')
    .on('card_template')
    .column('listId')
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('card_template').execute()
  await db.schema.dropTable('list_template').execute()
  await db.schema.dropTable('board_template').execute()
}
