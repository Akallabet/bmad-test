# Core Workflows

## Workflow 1: Create New Task

```mermaid
sequenceDiagram
    participant User
    participant UI as React Component
    participant Hook as useTasks Hook
    participant Service as taskService
    participant API as Fastify API
    participant Validation as Zod Middleware
    participant DB as Drizzle ORM
    participant SQLite as SQLite DB

    User->>UI: Types task text, presses Enter
    UI->>Hook: createTask("Buy groceries")

    Note over Hook: Optimistic update
    Hook->>UI: Immediately add task to local state
    UI->>User: Show task in list (optimistic)

    Hook->>Service: POST /api/tasks
    Service->>API: fetch("/api/tasks", { body: {text: "Buy groceries"} })

    API->>Validation: Validate request body
    Validation->>Validation: CreateTaskInputSchema.parse()

    alt Validation Success
        Validation->>API: Request valid
        API->>DB: db.insert(tasks).values({...})
        DB->>SQLite: INSERT INTO tasks...
        SQLite->>DB: Return inserted row
        DB->>API: { id: 3, text: "Buy groceries", ... }
        API->>Service: 201 Created { task: {...} }
        Service->>Hook: Success response
        Hook->>UI: Update with server data (replace optimistic)
        UI->>User: Task confirmed with server ID
    else Validation Failed
        Validation->>API: Throw validation error
        API->>Service: 400 Bad Request { error: "..." }
        Service->>Hook: Error response
        Hook->>UI: Remove optimistic task, show error
        UI->>User: Display error message
    end
```

**Key Points:**
- **Optimistic UI Update:** Task appears immediately before server confirms (< 100ms perceived latency)
- **Zod Validation:** Request validated before reaching business logic
- **Error Recovery:** Failed requests remove optimistic update and show error
- **Auto-generated Fields:** Server assigns `id`, `createdAt`, `sortOrder` - frontend never provides these

## Workflow 2: Edit Task Inline

```mermaid
sequenceDiagram
    participant User
    participant TaskItem as TaskItem Component
    participant Hook as useTasks Hook
    participant Service as taskService
    participant API as Fastify API
    participant DB as Drizzle ORM

    User->>TaskItem: Clicks on task text
    TaskItem->>TaskItem: Enter edit mode (input field)
    User->>TaskItem: Edits text, presses Enter

    TaskItem->>Hook: updateTask(id: 3, text: "Buy groceries and milk")

    Note over Hook: Optimistic update
    Hook->>TaskItem: Immediately update local state
    TaskItem->>User: Show updated text

    Hook->>Service: PUT /api/tasks/3
    Service->>API: fetch("/api/tasks/3", { body: {text: "..."} })
    API->>DB: db.update(tasks).set({text: "..."}).where(eq(tasks.id, 3))
    DB->>API: Updated task
    API->>Service: 200 OK { task: {...} }
    Service->>Hook: Success
    Hook->>TaskItem: Confirm update

    Note over TaskItem: Edit mode exits
    TaskItem->>User: Display updated task (save on blur)

    alt User presses Escape
        TaskItem->>Hook: Cancel edit
        Hook->>TaskItem: Revert to original text
        TaskItem->>User: Show original text
    end
```

**Key Points:**
- **Inline Editing:** No modal dialogs - edit directly in place (FR2 requirement)
- **Save on Blur/Enter:** Saves when user clicks away or presses Enter
- **Cancel on Escape:** Pressing Escape reverts changes without API call
- **Optimistic Update:** Text changes immediately, confirmed by server

## Workflow 3: Archive and Restore Task

```mermaid
sequenceDiagram
    participant User
    participant UI as TaskItem Component
    participant Hook as useTasks Hook
    participant API as Fastify API
    participant DB as Drizzle ORM

    Note over User,DB: Archive Flow
    User->>UI: Clicks archive button
    UI->>Hook: archiveTask(id: 3)

    Hook->>UI: Remove from active list (optimistic)
    UI->>User: Task disappears from active view

    Hook->>API: PATCH /api/tasks/3/archive
    API->>DB: db.update(tasks).set({archivedAt: new Date()})
    DB->>API: { task: {..., archivedAt: "2026-01-13T..." } }
    API->>Hook: 200 OK
    Hook->>Hook: Update archived tasks list

    Note over User,DB: Restore Flow (from Archived View)
    User->>UI: Navigates to /archived, clicks restore
    UI->>Hook: restoreTask(id: 3)

    Hook->>UI: Add back to active list (optimistic)
    UI->>User: Task appears in active view

    Hook->>API: PATCH /api/tasks/3/restore
    API->>DB: db.update(tasks).set({archivedAt: null})
    DB->>API: { task: {..., archivedAt: null} }
    API->>Hook: 200 OK
    Hook->>Hook: Remove from archived list

    Note over API: Idempotent behavior
    alt Already Archived
        API->>Hook: 200 OK (no-op)
    end
    alt Already Active
        API->>Hook: 200 OK (no-op)
    end
```

**Key Points:**
- **Soft Delete:** Archive sets `archivedAt` timestamp, doesn't delete from database (FR3, FR4)
- **Progressive Disclosure:** Archived tasks hidden by default, revealed via /archived route
- **Idempotent Operations:** Archiving already-archived task returns 200 (no error)
- **Reversible Actions:** Users can restore archived tasks without data loss

## Workflow 4: Sort Tasks (Three Methods)

```mermaid
sequenceDiagram
    participant User
    participant UI as TaskList Component
    participant Hook as useTasks Hook
    participant Service as taskService
    participant API as Fastify API
    participant DB as Drizzle ORM

    Note over User,DB: Sort by Date (Client-side)
    User->>UI: Selects "Sort: Newest First"
    UI->>Hook: setSortMode("date-desc")
    Hook->>UI: Return tasks sorted by createdAt DESC
    UI->>User: Display re-ordered list (no API call)

    Note over User,DB: Sort Alphabetically (Client-side)
    User->>UI: Selects "Sort: A-Z"
    UI->>Hook: setSortMode("alphabetical")
    Hook->>UI: Return tasks sorted by text ASC
    UI->>User: Display re-ordered list (no API call)

    Note over User,DB: Drag-and-Drop Manual Sort (Server-side)
    User->>UI: Drags task #3 to position 1
    UI->>Hook: reorderTasks([{id:3, sortOrder:1}, {id:1, sortOrder:2}, ...])

    Hook->>UI: Update local sortOrder (optimistic)
    UI->>User: Show new order immediately

    Hook->>Service: POST /api/tasks/reorder
    Service->>API: fetch("/api/tasks/reorder", { body: {tasks: [...]} })
    API->>DB: Transaction: UPDATE tasks SET sortOrder = CASE id...
    DB->>API: Success
    API->>Service: 200 OK { success: true }
    Service->>Hook: Confirm reorder
```

**Key Points:**
- **Date/Alphabetical Sorting:** Client-side only, no API calls (instant response)
- **Manual Sorting:** Server-side via batch update endpoint (preserves order across sessions)
- **Batch Update:** Single `/tasks/reorder` endpoint updates multiple tasks in transaction
- **Optimistic UI:** Drag-and-drop shows new order immediately, confirmed by server

## Workflow 5: First-Time Visit with Welcome Message

```mermaid
sequenceDiagram
    participant User
    participant Browser as Browser (localStorage)
    participant App as React App
    participant Router as React Router Loader
    participant API as Fastify API

    User->>Browser: Visits app for first time
    Browser->>App: Load React app
    App->>Router: Navigate to /

    Router->>API: GET /api/tasks (loader)
    API->>Router: { tasks: [] } (empty database)

    Router->>App: Render with empty tasks

    App->>Browser: Check localStorage.getItem("welcomeShown")
    Browser->>App: null (not shown before)

    App->>User: Display welcome message overlay
    User->>App: Clicks "Get Started" or dismiss
    App->>Browser: localStorage.setItem("welcomeShown", "true")
    App->>User: Hide welcome message

    Note over User,API: Subsequent Visits
    User->>Browser: Visits app again
    Browser->>App: Load React app
    App->>Browser: Check localStorage.getItem("welcomeShown")
    Browser->>App: "true"
    App->>User: No welcome message (skip directly to task list)
```

**Key Points:**
- **Client-side Tracking:** localStorage tracks if welcome message shown (FR6)
- **One-time Display:** Message shown once per browser, not per session
- **No Server State:** Welcome message state is purely client-side (no database field)
- **Dismissible:** User can close message anytime via button or "X" icon

## Workflow 6: Error Handling - Network Failure

```mermaid
sequenceDiagram
    participant User
    participant UI as React Component
    participant Hook as useTasks Hook
    participant Service as taskService
    participant API as Fastify API (Unreachable)

    User->>UI: Creates new task
    UI->>Hook: createTask("Buy milk")

    Hook->>UI: Optimistic update (add task locally)
    UI->>User: Show task in list

    Hook->>Service: POST /api/tasks
    Service->>API: fetch("/api/tasks", ...)

    Note over API: Network timeout or server down
    API-->>Service: Network error / fetch fails

    Service->>Hook: Throw error
    Hook->>Hook: Remove optimistic task from state
    Hook->>UI: Trigger error state

    UI->>User: Display error banner: "Failed to save task. Check connection."
    User->>UI: Clicks "Retry"
    UI->>Hook: createTask("Buy milk") (retry)

    alt Server Recovered
        Hook->>API: POST /api/tasks
        API->>Hook: 201 Created
        Hook->>UI: Success - add task back
        UI->>User: Task saved successfully
    else Still Failing
        Hook->>UI: Show persistent error
        UI->>User: "Unable to reach server. Try again later."
    end
```

**Key Points:**
- **Optimistic Rollback:** Failed requests remove optimistic updates
- **User Feedback:** Clear error messages explain what went wrong
- **Retry Mechanism:** User can manually retry failed operations
- **Graceful Degradation:** App remains usable, explains server issues
