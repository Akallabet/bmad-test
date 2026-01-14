export interface Task {
  id: number; // Primary key, auto-increment
  text: string; // Task content
  createdAt: Date; // For date sorting
  archivedAt: Date | null; // null = active, non-null = archived
  sortOrder: number; // For manual sorting
}
