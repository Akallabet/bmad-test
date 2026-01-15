# Data Models

## Task

**Purpose:** Represents a single to-do item in the application, supporting all CRUD operations, archival workflow, and sorting capabilities defined in the PRD (FR1-FR5).

**Key Attributes:**
- `id`: `number` - Auto-incrementing primary key, uniquely identifies each task
- `text`: `string` - Task description/content entered by user, required field with 1-500 character limit
- `createdAt`: `Date` - Timestamp when task was created, used for date-based sorting (FR5)
- `archivedAt`: `Date | null` - Nullable timestamp; `null` = active task, non-null = archived task with archive time (FR3, FR4)
- `sortOrder`: `number` - Integer for manual drag-and-drop ordering, allows user-defined sequence (FR5)

### TypeScript Interface

```typescript
// packages/shared/src/types/task.ts
export interface Task {
  id: number;
  text: string;
  createdAt: Date;
  archivedAt: Date | null;
  sortOrder: number;
}

// Type for creating a new task (omit id, timestamps, sortOrder - set by backend)
export type CreateTaskInput = {
  text: string;
};

// Type for updating a task (text only - use /reorder for sortOrder changes)
export type UpdateTaskInput = {
  text: string;
};

// Type for reordering tasks
export type ReorderTasksInput = {
  tasks: Array<{ id: number; sortOrder: number }>;
};
```

### Zod Schemas for Validation

```typescript
// packages/shared/src/schemas/task.schema.ts
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

// Reorder tasks input schema
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
```

**Note:** These Zod schemas serve dual purposes:
1. Runtime validation in Fastify routes (via @fastify/type-provider-zod)
2. OpenAPI schema generation (via @fastify/swagger with Zod support)

### Relationships

- No relationships - single-table design
- Future extension points (not in MVP):
  - Could add `User` entity (one-to-many: User → Tasks) when authentication is added
  - Could add `Tag` entity (many-to-many: Tasks ↔ Tags) for categorization
  - Could add `Project` entity (one-to-many: Project → Tasks) for grouping
