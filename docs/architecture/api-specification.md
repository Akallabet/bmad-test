# API Specification

## REST API Specification

```yaml
openapi: 3.0.0
info:
  title: Simple To-Do App API
  version: 1.0.0
  description: RESTful API for task management supporting CRUD operations, archival, and sorting. All endpoints use Zod schemas for validation and OpenAPI generation.
servers:
  - url: http://localhost:3000/api
    description: Local development server
  - url: https://todo-bmad-demo.fly.dev/api
    description: Production server (Fly.io)

paths:
  /health:
    get:
      summary: Health check endpoint
      description: Returns 200 if API and database are operational. Used by Fly.io for health monitoring.
      operationId: healthCheck
      tags:
        - System
      responses:
        '200':
          description: Service is healthy
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: "ok"
                  timestamp:
                    type: string
                    format: date-time
                    example: "2026-01-13T15:00:00.000Z"
                  database:
                    type: string
                    example: "connected"
        '503':
          description: Service is unhealthy
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: "error"
                  error:
                    type: string
                    example: "Database connection failed"

  /tasks:
    get:
      summary: Get all tasks
      description: Returns all tasks (both active and archived). Frontend filters by archivedAt field. Limited to 1000 tasks maximum.
      operationId: getTasks
      tags:
        - Tasks
      parameters:
        - name: archived
          in: query
          description: Filter by archived status (true = archived only, false = active only, omit = all)
          required: false
          schema:
            type: boolean
      responses:
        '200':
          description: List of tasks (max 1000 returned)
          content:
            application/json:
              schema:
                type: object
                properties:
                  tasks:
                    type: array
                    items:
                      $ref: '#/components/schemas/Task'
              example:
                tasks:
                  - id: 1
                    text: "Build monorepo structure"
                    createdAt: "2026-01-13T10:00:00.000Z"
                    archivedAt: null
                    sortOrder: 1
                  - id: 2
                    text: "Deploy to Fly.io"
                    createdAt: "2026-01-13T10:05:00.000Z"
                    archivedAt: null
                    sortOrder: 2
        '500':
          $ref: '#/components/responses/InternalServerError'

    post:
      summary: Create a new task
      description: Creates a new task with auto-generated id, createdAt, and sortOrder. Validated with CreateTaskInputSchema.
      operationId: createTask
      tags:
        - Tasks
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateTaskInput'
            example:
              text: "Write architecture documentation"
      responses:
        '201':
          description: Task created successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  task:
                    $ref: '#/components/schemas/Task'
              example:
                task:
                  id: 3
                  text: "Write architecture documentation"
                  createdAt: "2026-01-13T10:10:00.000Z"
                  archivedAt: null
                  sortOrder: 3
        '400':
          $ref: '#/components/responses/BadRequest'
        '500':
          $ref: '#/components/responses/InternalServerError'

  /tasks/{id}:
    get:
      summary: Get a single task by ID
      description: Returns a specific task by its ID
      operationId: getTaskById
      tags:
        - Tasks
      parameters:
        - name: id
          in: path
          required: true
          description: Task ID
          schema:
            type: integer
      responses:
        '200':
          description: Task found
          content:
            application/json:
              schema:
                type: object
                properties:
                  task:
                    $ref: '#/components/schemas/Task'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'

    put:
      summary: Update task text
      description: Updates task text only. For sortOrder changes, use POST /tasks/reorder. Validated with UpdateTaskInputSchema.
      operationId: updateTask
      tags:
        - Tasks
      parameters:
        - name: id
          in: path
          required: true
          description: Task ID
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateTaskInput'
            example:
              text: "Build monorepo structure (completed)"
      responses:
        '200':
          description: Task updated successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  task:
                    $ref: '#/components/schemas/Task'
        '400':
          $ref: '#/components/responses/BadRequest'
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'

    delete:
      summary: Delete a task permanently
      description: Hard deletes a task from the database (not used in MVP UI, but available for future cleanup)
      operationId: deleteTask
      tags:
        - Tasks
      parameters:
        - name: id
          in: path
          required: true
          description: Task ID
          schema:
            type: integer
      responses:
        '204':
          description: Task deleted successfully (no content)
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'

  /tasks/{id}/archive:
    patch:
      summary: Archive a task
      description: Sets archivedAt to current timestamp, moving task out of active view. Idempotent - archiving an already-archived task returns 200 with no changes.
      operationId: archiveTask
      tags:
        - Tasks
      parameters:
        - name: id
          in: path
          required: true
          description: Task ID
          schema:
            type: integer
      responses:
        '200':
          description: Task archived successfully (or already archived)
          content:
            application/json:
              schema:
                type: object
                properties:
                  task:
                    $ref: '#/components/schemas/Task'
              example:
                task:
                  id: 1
                  text: "Build monorepo structure"
                  createdAt: "2026-01-13T10:00:00.000Z"
                  archivedAt: "2026-01-13T14:30:00.000Z"
                  sortOrder: 1
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'

  /tasks/{id}/restore:
    patch:
      summary: Restore an archived task
      description: Sets archivedAt to null, returning task to active view. Idempotent - restoring an already-active task returns 200 with no changes.
      operationId: restoreTask
      tags:
        - Tasks
      parameters:
        - name: id
          in: path
          required: true
          description: Task ID
          schema:
            type: integer
      responses:
        '200':
          description: Task restored successfully (or already active)
          content:
            application/json:
              schema:
                type: object
                properties:
                  task:
                    $ref: '#/components/schemas/Task'
              example:
                task:
                  id: 1
                  text: "Build monorepo structure"
                  createdAt: "2026-01-13T10:00:00.000Z"
                  archivedAt: null
                  sortOrder: 1
        '404':
          $ref: '#/components/responses/NotFound'
        '500':
          $ref: '#/components/responses/InternalServerError'

  /tasks/reorder:
    post:
      summary: Reorder multiple tasks
      description: Batch update sortOrder for multiple tasks (used for drag-and-drop). This is the ONLY endpoint for modifying sortOrder. Validated with ReorderTasksInputSchema.
      operationId: reorderTasks
      tags:
        - Tasks
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ReorderTasksInput'
            example:
              tasks:
                - id: 3
                  sortOrder: 1
                - id: 1
                  sortOrder: 2
                - id: 2
                  sortOrder: 3
      responses:
        '200':
          description: Tasks reordered successfully
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                    example: true
        '400':
          $ref: '#/components/responses/BadRequest'
        '500':
          $ref: '#/components/responses/InternalServerError'

components:
  schemas:
    Task:
      type: object
      description: Corresponds to TaskSchema in packages/shared/src/schemas/task.schema.ts
      properties:
        id:
          type: integer
          example: 1
        text:
          type: string
          minLength: 1
          maxLength: 500
          example: "Build monorepo structure"
        createdAt:
          type: string
          format: date-time
          example: "2026-01-13T10:00:00.000Z"
        archivedAt:
          type: string
          format: date-time
          nullable: true
          example: null
        sortOrder:
          type: integer
          minimum: 0
          example: 1
      required:
        - id
        - text
        - createdAt
        - archivedAt
        - sortOrder

    CreateTaskInput:
      type: object
      description: Corresponds to CreateTaskInputSchema in packages/shared/src/schemas/task.schema.ts
      properties:
        text:
          type: string
          minLength: 1
          maxLength: 500
          example: "Write API documentation"
      required:
        - text

    UpdateTaskInput:
      type: object
      description: Corresponds to UpdateTaskInputSchema in packages/shared/src/schemas/task.schema.ts
      properties:
        text:
          type: string
          minLength: 1
          maxLength: 500
          example: "Updated task text"
      required:
        - text

    ReorderTasksInput:
      type: object
      description: Corresponds to ReorderTasksInputSchema in packages/shared/src/schemas/task.schema.ts
      properties:
        tasks:
          type: array
          minItems: 1
          items:
            type: object
            properties:
              id:
                type: integer
                minimum: 1
              sortOrder:
                type: integer
                minimum: 0
            required:
              - id
              - sortOrder
      required:
        - tasks

  responses:
    BadRequest:
      description: Invalid request (validation error)
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
                example: "Validation failed: text must be between 1 and 500 characters"

    NotFound:
      description: Resource not found
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
                example: "Task not found"

    InternalServerError:
      description: Internal server error
      content:
        application/json:
          schema:
            type: object
            properties:
              error:
                type: string
                example: "Internal server error"

  securitySchemes: {}
```

## API Implementation with Zod

The API uses **@fastify/type-provider-zod** to automatically validate requests and generate OpenAPI documentation from Zod schemas:

```typescript
// packages/api/src/routes/tasks.ts (example route)
import { FastifyPluginAsync } from 'fastify';
import { CreateTaskInputSchema, TaskSchema } from '@todo-app/shared/schemas/task.schema';

export const tasksRoutes: FastifyPluginAsync = async (fastify) => {
  // POST /api/tasks - Create task with Zod validation
  fastify.post('/tasks', {
    schema: {
      body: CreateTaskInputSchema,
      response: {
        201: z.object({
          task: TaskSchema,
        }),
      },
    },
  }, async (request, reply) => {
    const { text } = request.body; // TypeScript knows text is string (1-500 chars)
    // Implementation...
  });
};
```

**Benefits:**
- ✅ Single source of truth (Zod schemas) for validation and OpenAPI
- ✅ Runtime validation prevents invalid data from reaching business logic
- ✅ TypeScript inference from schemas eliminates manual type definitions
- ✅ OpenAPI docs auto-generated and always in sync with code

## Key API Design Decisions

**1. Health Check Endpoint:** `/health` returns database connectivity status for Fly.io monitoring. If SQLite connection fails, returns 503, triggering instance restart.

**2. Idempotent Archive/Restore:** Calling `/tasks/1/archive` on an already-archived task returns 200 (no-op), not 400. Simplifies frontend logic - no need to check state before action.

**3. Separate Reorder Endpoint:** Removed `sortOrder` from PUT endpoint. Use `POST /tasks/reorder` exclusively for position changes. Clear separation: PUT = edit text, POST /reorder = change position.

**4. Max 1000 Tasks:** GET /tasks limits response to first 1000 tasks sorted by sortOrder. Known limitation documented - pagination is post-MVP enhancement.

**5. Consistent Response Wrapping:** All responses wrap data in objects (`{ task }`, `{ tasks }`), never bare arrays. Enables future metadata additions without breaking changes.

## Known Limitations (MVP Scope)

- ❌ **No pagination:** GET /tasks returns max 1000 items
- ❌ **No API versioning:** Paths are `/api/tasks`, not `/api/v1/tasks`
- ❌ **Simple error responses:** Error objects are strings, not structured codes
- ❌ **No rate limiting documentation:** Fastify plugin enforces 100 req/min but not in OpenAPI spec
- ❌ **No CORS headers:** Same-origin only (frontend served from same server)
