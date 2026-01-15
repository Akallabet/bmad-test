import { eq, isNull, asc, desc } from 'drizzle-orm';
import { db } from './client';
import { tasks } from './schema';

// Get all active tasks sorted by sortOrder
export async function getActiveTasks() {
  return await db
    .select()
    .from(tasks)
    .where(isNull(tasks.archivedAt))
    .orderBy(asc(tasks.sortOrder));
}

// Create new task with auto-generated sortOrder
export async function createTask(text: string) {
  // Get next sortOrder value
  const result = await db
    .select({ maxSort: tasks.sortOrder })
    .from(tasks)
    .orderBy(desc(tasks.sortOrder))
    .limit(1);

  const nextSortOrder = (result[0]?.maxSort ?? 0) + 1;

  const [newTask] = await db
    .insert(tasks)
    .values({
      text,
      createdAt: new Date(),
      archivedAt: null,
      sortOrder: nextSortOrder,
    })
    .returning();

  return newTask;
}

// Update task text
export async function updateTaskText(id: number, text: string) {
  const [updated] = await db
    .update(tasks)
    .set({ text })
    .where(eq(tasks.id, id))
    .returning();

  if (!updated) throw new Error('Task not found');
  return updated;
}

// Archive task by setting archivedAt timestamp
export async function archiveTask(id: number) {
  const [archived] = await db
    .update(tasks)
    .set({ archivedAt: new Date() })
    .where(eq(tasks.id, id))
    .returning();

  if (!archived) throw new Error('Task not found');
  return archived;
}

// Restore archived task by clearing archivedAt
export async function restoreTask(id: number) {
  const [restored] = await db
    .update(tasks)
    .set({ archivedAt: null })
    .where(eq(tasks.id, id))
    .returning();

  if (!restored) throw new Error('Task not found');
  return restored;
}

// Reorder tasks - batch update sortOrder in transaction (for future use)
export async function reorderTasks(updates: Array<{ id: number; sortOrder: number }>) {
  return await db.transaction(async (tx) => {
    const results = [];
    for (const update of updates) {
      const [result] = await tx
        .update(tasks)
        .set({ sortOrder: update.sortOrder })
        .where(eq(tasks.id, update.id))
        .returning();

      if (result) results.push(result);
    }
    return results;
  });
}
