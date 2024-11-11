import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('list')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity().notNull()
    )
    .addColumn('title', 'text', (c) => c.notNull())
    .addColumn('order', 'integer')
    .addColumn('boardId', 'integer', (c) =>
      c.references('board.id').onDelete('cascade').notNull()
    )
    .addColumn('userId', 'integer', (c) =>
      c.references('user.id').onDelete('set null').notNull()
    )
    .addColumn('createdAt', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .addColumn('updatedAt', 'timestamptz', (c) =>
      c.defaultTo(sql`CURRENT_TIMESTAMP`).notNull()
    )
    .execute()

  await db.schema
    .createIndex('idx_list_boardId')
    .on('list')
    .column('boardId')
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropIndex('idx_list_boardId').on('list').execute()
  await db.schema.dropTable('list').execute()
}
