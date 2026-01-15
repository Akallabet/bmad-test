import { sqliteTable, integer, text, index } from 'drizzle-orm/sqlite-core';

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  text: text('text').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  archivedAt: integer('archived_at', { mode: 'timestamp' }),
  sortOrder: integer('sort_order').notNull(),
}, (table) => ({
  archivedAtIdx: index('idx_tasks_archived_at').on(table.archivedAt),
  sortOrderIdx: index('idx_tasks_sort_order').on(table.sortOrder),
  createdAtIdx: index('idx_tasks_created_at').on(table.createdAt),
}));

// Type inference from schema
export type DbTask = typeof tasks.$inferSelect;
export type DbInsertTask = typeof tasks.$inferInsert;
