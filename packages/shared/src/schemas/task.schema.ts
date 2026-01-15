import { z } from 'zod';

// Task schema
export const TaskSchema = z.object({
  id: z.number().int().positive(),
  text: z.string().min(1).max(500),
  createdAt: z.date(),
  archivedAt: z.date().nullable(),
  sortOrder: z.number().int().nonnegative(),
});

// Create task input schema
export const CreateTaskInputSchema = z.object({
  text: z.string().min(1, 'Task text is required').max(500, 'Task text must be 500 characters or less').trim(),
});

// Update task input schema (text only)
export const UpdateTaskInputSchema = z.object({
  text: z.string().min(1, 'Task text is required').max(500, 'Task text must be 500 characters or less').trim(),
});

// Reorder tasks input schema (for future use)
export const ReorderTasksInputSchema = z.object({
  tasks: z.array(
    z.object({
      id: z.number().int().positive(),
      sortOrder: z.number().int().nonnegative(),
    })
  ).min(1, 'At least one task required for reordering'),
});

// Infer TypeScript types from Zod schemas
export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskInputSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskInputSchema>;
export type ReorderTasksInput = z.infer<typeof ReorderTasksInputSchema>;
