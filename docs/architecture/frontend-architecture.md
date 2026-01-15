# Frontend Architecture

## Component Architecture

The frontend follows a **feature-based organization** with clear separation between presentational and container components.

**Component Organization:**
```
packages/web/src/components/
├── TaskList/
│   ├── TaskList.tsx          # Container: manages list state
│   ├── TaskList.css          # Component-specific styles
│   └── index.ts              # Re-export
├── TaskItem/
│   ├── TaskItem.tsx          # Presentational: single task display
│   ├── TaskItem.css
│   └── index.ts
├── AddTask/
│   ├── AddTask.tsx           # Controlled form component
│   ├── AddTask.css
│   └── index.ts
├── ArchivedTasks/
│   ├── ArchivedTasks.tsx     # Archive view container
│   ├── ArchivedTasks.css
│   └── index.ts
├── WelcomeMessage/
│   ├── WelcomeMessage.tsx    # First-visit banner
│   ├── WelcomeMessage.css
│   └── index.ts
└── shared/                   # Shared UI primitives
    ├── Button.tsx
    ├── Icon.tsx
    └── ErrorBanner.tsx
```

**Component Template Example:**

```typescript
// packages/web/src/components/TaskItem/TaskItem.tsx
import { useState, useRef, useEffect } from 'react';
import type { Task } from '@todo-app/shared';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
  onUpdate: (id: number, text: string) => Promise<void>;
  onArchive: (id: number) => Promise<void>;
}

export function TaskItem({ task, onUpdate, onArchive }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when entering edit mode
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = async () => {
    if (editText.trim() && editText !== task.text) {
      await onUpdate(task.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(task.text); // Revert changes
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <div className="task-item task-item--editing">
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleSave}
          maxLength={500}
          className="task-item__input"
        />
      </div>
    );
  }

  return (
    <div className="task-item" draggable>
      <button
        className="task-item__text"
        onClick={() => setIsEditing(true)}
        type="button"
      >
        {task.text}
      </button>
      <button
        className="task-item__archive"
        onClick={() => onArchive(task.id)}
        type="button"
        aria-label="Archive task"
      >
        <span className="icon-archive" />
      </button>
    </div>
  );
}
```

## State Management Architecture

**State Strategy:** Colocate state as close as possible to where it's used, lift only when necessary.

```typescript
// packages/web/src/hooks/useTasks.ts
import { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import type { Task } from '@todo-app/shared';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createTask = async (text: string) => {
    // Optimistic update
    const optimisticTask: Task = {
      id: Date.now(), // Temporary ID
      text,
      createdAt: new Date(),
      archivedAt: null,
      sortOrder: Math.max(...tasks.map(t => t.sortOrder), 0) + 1,
    };

    setTasks(prev => [...prev, optimisticTask]);

    try {
      const newTask = await taskService.createTask(text);
      // Replace optimistic with server response
      setTasks(prev => prev.map(t => t.id === optimisticTask.id ? newTask : t));
    } catch (err) {
      // Rollback optimistic update
      setTasks(prev => prev.filter(t => t.id !== optimisticTask.id));
      setError('Failed to create task');
      throw err;
    }
  };

  // ... other operations with similar optimistic update + rollback pattern

  return { tasks, loading, error, createTask, updateTask, archiveTask, restoreTask, reorderTasks };
}
```

**State Management Patterns:**
- **Optimistic Updates:** All mutations update local state immediately before API confirmation
- **Rollback on Error:** Failed API calls restore previous state
- **Single Source of Truth:** `tasks` array in `useTasks` hook is canonical state
- **Derived State:** Sorting and filtering computed from `tasks` array, not stored separately
- **No Global State Library:** React hooks sufficient for single-page task list

## Routing Architecture

React Router v7 uses file-based routing with loaders/actions pattern.

```
packages/web/src/routes/
├── root.tsx                  # Layout component
├── index.tsx                 # / (main task list)
├── archived.tsx              # /archived (archived tasks view)
└── _error.tsx                # Error boundary
```

**Route Organization Example:**

```typescript
// packages/web/src/routes/root.tsx
import { Outlet, Link } from 'react-router';

export default function Root() {
  return (
    <div className="app">
      <header className="app__header">
        <h1>Simple To-Do App</h1>
        <nav className="app__nav">
          <Link to="/" className="nav-link">Active</Link>
          <Link to="/archived" className="nav-link">Archived</Link>
        </nav>
      </header>
      <main className="app__main">
        <Outlet />
      </main>
      <footer className="app__footer">
        <a href="https://github.com/your-username/todo-bmad-demo/tree/main/docs">
          View Documentation (PRD, Architecture, Stories)
        </a>
      </footer>
    </div>
  );
}
```

## Frontend Services Layer

**API Client Setup:**

```typescript
// packages/web/src/services/taskService.ts
import type { Task, CreateTaskInput, UpdateTaskInput } from '@todo-app/shared';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

class TaskService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Unknown error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async getTasks(params?: { archived?: boolean }): Promise<Task[]> {
    const query = params?.archived !== undefined
      ? `?archived=${params.archived}`
      : '';
    const data = await this.request<{ tasks: Task[] }>(`/tasks${query}`);

    // Convert ISO date strings to Date objects
    return data.tasks.map(task => ({
      ...task,
      createdAt: new Date(task.createdAt),
      archivedAt: task.archivedAt ? new Date(task.archivedAt) : null,
    }));
  }

  async createTask(text: string): Promise<Task> {
    const input: CreateTaskInput = { text };
    const data = await this.request<{ task: Task }>('/tasks', {
      method: 'POST',
      body: JSON.stringify(input),
    });

    return {
      ...data.task,
      createdAt: new Date(data.task.createdAt),
      archivedAt: data.task.archivedAt ? new Date(data.task.archivedAt) : null,
    };
  }

  // Additional methods: updateTask, archiveTask, restoreTask, reorderTasks...
}

export const taskService = new TaskService();
```

**Service Design Patterns:**
- **Singleton Instance:** Single `taskService` instance exported
- **Type-Safe Requests:** Generic `request<T>` method ensures type safety
- **Date Deserialization:** Converts ISO strings to Date objects automatically
- **Environment-Aware:** Uses `VITE_API_BASE_URL` for different environments
- **Error Handling:** Extracts error messages from response bodies
- **No Axios Dependency:** Uses native fetch API (smaller bundle size)
