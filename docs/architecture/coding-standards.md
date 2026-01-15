# Coding Standards

**Critical Fullstack Rules:**

- **Type Sharing:** Always define types in `packages/shared` and import from `@todo-app/shared` - never duplicate type definitions
- **API Calls:** Never make direct HTTP calls - always use the service layer (`taskService.ts`)
- **Environment Variables:** Access only through config objects, never `process.env` or `import.meta.env` directly outside config files
- **Error Handling:** All API routes must use the standard error handler middleware
- **State Updates:** Never mutate state directly - use proper state management patterns (`setState`, `setTasks`)
- **Zod Schemas:** Define validation schemas once in `shared/schemas`, use for both frontend and backend validation
- **Date Handling:** API returns ISO strings, frontend immediately converts to Date objects in service layer
- **Async Operations:** Always handle errors with try/catch, never let promises reject silently

## Naming Conventions

| Element | Frontend | Backend | Example |
|---------|----------|---------|---------|
| **Components** | PascalCase | - | `TaskItem.tsx` |
| **Hooks** | camelCase with 'use' | - | `useTasks.ts` |
| **API Routes** | - | kebab-case | `/api/tasks/:id/archive` |
| **Database Tables** | - | snake_case | `tasks`, `created_at` |
| **Functions** | camelCase | camelCase | `createTask`, `getActiveTasks` |
| **Types/Interfaces** | PascalCase | PascalCase | `Task`, `CreateTaskInput` |
| **Constants** | SCREAMING_SNAKE_CASE | SCREAMING_SNAKE_CASE | `API_BASE_URL`, `MAX_TASKS` |
