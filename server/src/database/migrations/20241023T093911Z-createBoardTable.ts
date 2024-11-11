import { Kysely, sql } from 'kysely'

export async function up(db: Kysely<any>) {
  await db.schema
    .createTable('board')
    .addColumn('id', 'integer', (c) =>
      c.primaryKey().generatedAlwaysAsIdentity()
    )
    .addColumn('title', 'text', (c) => c.notNull())
    .addColumn('imageId', 'text')
    .addColumn('imageThumbUrl', 'text')
    .addColumn('imageFullUrl', 'text')
    .addColumn('imageUserName', 'text')
    .addColumn('imageLinkHTML', 'text')
    .addColumn('createdAt', 'timestamptz', (c) =>
      c.notNull().defaultTo(sql`now()`)
    )
    .addColumn('updatedAt', 'timestamptz', (c) =>
      c.notNull().defaultTo(sql`now()`)
    )
    .addColumn('userId', 'integer', (c) =>
      c.notNull().references('user.id').onDelete('cascade')
    )
    .execute()
}

export async function down(db: Kysely<any>) {
  await db.schema.dropTable('board').execute()
}
