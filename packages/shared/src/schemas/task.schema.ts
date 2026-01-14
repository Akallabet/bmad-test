import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.number(),
  text: z.string(),
  createdAt: z.date(),
  archivedAt: z.date().nullable(),
  sortOrder: z.number(),
});

export const CreateTaskInputSchema = z.object({
  text: z.string().min(1).max(500),
});

export const UpdateTaskInputSchema = z.object({
  text: z.string().min(1).max(500),
});

export type Task = z.infer<typeof TaskSchema>;
export type CreateTaskInput = z.infer<typeof CreateTaskInputSchema>;
export type UpdateTaskInput = z.infer<typeof UpdateTaskInputSchema>;
