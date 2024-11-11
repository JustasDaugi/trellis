import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('card')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity().notNull()
    )
    .addColumn('title', 'text', (c) => c.notNull())
    .addColumn('order', 'integer')
    .addColumn('description', 'text')
    .addColumn('listId', 'integer', (c) =>
      c.references('list.id').onDelete('cascade').notNull()
    )
    .addColumn('userId', 'integer', (c) =>
      c.references('user.id').onDelete('cascade').notNull()
    )
    .addColumn('createdAt', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()

  await db.schema
    .createIndex('idx_card_listId')
    .on('card')
    .column('listId')
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropIndex('idx_card_listId').on('card').execute()
  await db.schema.dropTable('card').execute()
}
