# Epic 1: Core Task Management

## Epic Goal

Implement the foundational task CRUD operations (Create, Read, Update) with database persistence, enabling users to add and edit tasks with data surviving page reloads.

## Epic Description

**Context:**

This epic establishes the core functionality of the to-do application. It delivers the minimum viable product for task management: adding new tasks, editing existing tasks inline, and persisting all data to a database.

**What's Being Built:**

- Task creation interface with text input and submission
- Inline task editing with click-to-edit interaction
- Database schema and persistence layer using SQLite + Drizzle ORM
- REST API endpoints for task operations
- Frontend-backend integration for real-time task management

**Success Criteria:**

- Users can add new tasks via input field (Enter key or button click)
- Users can edit any task by clicking on it (save on blur/Enter, cancel on Escape)
- All tasks persist to database and survive page reloads
- API responses within 50ms for CRUD operations
- UI provides perceived instant feedback (< 100ms)

## Technical Foundation

**Technology Stack:**
- Frontend: React 19 + React Router v7, TypeScript (strict mode), Vite
- Backend: Node.js 24, Fastify, TypeScript (strict mode)
- Database: SQLite in-memory (`:memory:`) with Drizzle ORM
- Monorepo: npm workspaces (`/packages/web`, `/packages/api`, `/packages/shared`)

**Database Schema:**
```
tasks table:
- id: integer (primary key, auto-increment)
- text: string (task content)
- createdAt: timestamp (for date sorting)
- archivedAt: nullable timestamp (null = active)
- sortOrder: integer (for manual sorting)
```

**API Endpoints:**
- `GET /api/tasks` - Retrieve all active tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task text
- `DELETE /api/tasks/:id` - Delete task (future use)

## Stories

### Story 1.1: Project Setup and Monorepo Configuration

**Goal:** Establish monorepo structure, install dependencies, and configure build tooling.

**Acceptance Criteria:**
- Monorepo structure created with npm workspaces (`packages/web`, `packages/api`, `packages/shared`)
- TypeScript configured in strict mode for all packages
- ESLint and Prettier configured
- Vite build working for frontend
- Fastify server starts successfully for backend
- Shared types package ready for use

### Story 1.2: Database Schema and Backend API Foundation

**Goal:** Implement database schema, Drizzle ORM setup, and RESTful API endpoints for task operations.

**Acceptance Criteria:**
- SQLite in-memory database configured with Drizzle ORM
- `tasks` table schema defined in TypeScript
- Migrations run automatically at server startup
- `GET /api/tasks` endpoint returns all active tasks (archivedAt = null)
- `POST /api/tasks` endpoint creates new task with validation
- `PUT /api/tasks/:id` endpoint updates task text
- Fastify schema validation on all endpoints
- Rate limiting configured on API
- All endpoints respond within 50ms

### Story 1.3: Frontend Task Display and Add Functionality

**Goal:** Build React UI to display tasks and add new tasks with immediate feedback.

**Acceptance Criteria:**
- Task list component renders active tasks from API
- Add task input field at top of list
- New task submission works via Enter key or button click
- Optimistic UI update shows new task immediately
- API integration persists task to database
- Loading states handled gracefully
- Error states display user-friendly messages
- Input field clears after successful submission

### Story 1.4: Inline Task Editing

**Goal:** Enable users to edit task text inline by clicking on tasks.

**Acceptance Criteria:**
- Click on task text enters edit mode
- Edit mode shows input field with current text
- Save on blur or Enter key press
- Cancel on Escape key press
- Optimistic UI update shows edited text immediately
- API integration persists changes to database
- Edited task remains in same position in list
- Visual indication of edit mode (focus state, different styling)

## Dependencies

**No External Dependencies:** This is the foundational epic - all other epics depend on this.

**Internal Dependencies:**
- Story 1.1 must complete before 1.2 and 1.3
- Stories 1.2 and 1.3 can run in parallel after 1.1
- Story 1.4 depends on 1.2 and 1.3 completion

## Non-Functional Requirements

**From PRD:**
- NFR1: Initial page load < 2 seconds
- NFR2: Task operations perceived instant feedback (< 100ms UI response)
- NFR3: Browser support (Chrome, Firefox, Safari, Edge - last 2 versions)
- NFR4: Frontend bundle < 200KB gzipped
- NFR5: SQLite in-memory with Drizzle ORM
- NFR6: XSS prevention via React default escaping
- NFR7: SQL injection prevention via Drizzle parameterized queries
- NFR8: Rate limiting on API endpoints
- NFR9: HTTPS via Fly.io default config

## Definition of Done

- [ ] All 4 stories completed with acceptance criteria met
- [ ] Database schema implemented and migrations working
- [ ] API endpoints functional and performant (< 50ms response)
- [ ] Frontend displays tasks and handles add/edit operations
- [ ] Data persistence verified (tasks survive page reload)
- [ ] Input validation and sanitization implemented
- [ ] Error handling graceful and user-friendly
- [ ] Code follows ESLint/Prettier standards
- [ ] No console errors or warnings in browser
- [ ] Manual testing completed in Chrome (desktop) and one mobile browser

## Risk Assessment

**Primary Risk:** Database schema changes later in development could require migration complexity.

**Mitigation:**
- Design schema upfront to accommodate all known requirements (archive, sort order)
- Use Drizzle migrations from the start for easy schema evolution
- Add sortOrder and archivedAt fields even if not used yet

**Known Limitations:**
- In-memory database means data doesn't persist across server restarts
- All users share the same database instance (no authentication in MVP)

**Rollback Plan:** Not applicable (this is the foundation - no previous version exists).
