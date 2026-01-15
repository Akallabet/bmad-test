# Error Handling Strategy

## Error Flow

```mermaid
sequenceDiagram
    participant UI as Frontend Component
    participant Service as taskService
    participant API as Fastify API
    participant Handler as Error Handler
    participant User

    UI->>Service: createTask("text")
    Service->>API: POST /api/tasks

    alt Validation Error
        API->>Handler: ZodError thrown
        Handler->>Service: 400 { error, details }
        Service->>UI: throw Error
        UI->>User: Display validation error
    else Not Found Error
        API->>Handler: "Task not found" error
        Handler->>Service: 404 { error }
        Service->>UI: throw Error
        UI->>User: Display "Task not found"
    else Network Error
        Service->>UI: fetch fails
        UI->>User: Display "Connection failed"
    else Unexpected Error
        API->>Handler: Unhandled error
        Handler->>Handler: Log error
        Handler->>Service: 500 { error: "Internal server error" }
        Service->>UI: throw Error
        UI->>User: Display generic error
    end
```

## Error Response Format

```typescript
interface ApiError {
  error: string;               // Human-readable error message
  details?: Record<string, any>; // Optional validation details
}

// Example validation error:
{
  "error": "Validation failed",
  "details": [
    { "path": "text", "message": "Task text is required" }
  ]
}

// Example not found error:
{
  "error": "Task not found"
}
```

## Frontend Error Handling

```typescript
// packages/web/src/hooks/useTasks.ts
const createTask = async (text: string) => {
  try {
    const newTask = await taskService.createTask(text);
    setTasks(prev => [...prev, newTask]);
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Failed to create task');
    // Optionally show toast notification
    throw err; // Re-throw for component to handle
  }
};
```

## Backend Error Handling

```typescript
// packages/api/src/middleware/errorHandler.ts
export function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ZodError) {
    return reply.code(400).send({
      error: 'Validation failed',
      details: error.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    });
  }

  if (error.message === 'Task not found') {
    return reply.code(404).send({ error: error.message });
  }

  request.log.error(error);
  return reply.code(500).send({ error: 'Internal server error' });
}
```
