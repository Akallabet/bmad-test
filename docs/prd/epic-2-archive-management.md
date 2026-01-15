# Epic 2: Archive Management

## Epic Goal

Enable users to archive tasks to remove them from the active view while preserving data, and restore archived tasks back to the active list.

## Epic Description

**Context:**

Building on the core task management functionality (Epic 1), this epic adds task lifecycle management through archiving. This keeps the active task list uncluttered while preserving completed or deferred tasks for future reference.

**What's Being Built:**

- Archive action for active tasks (moves task out of active view)
- Archived tasks view (separate section or toggle)
- Restore action for archived tasks (moves task back to active view)
- API endpoints for archive/restore operations
- Frontend UI for accessing and managing archived tasks

**Success Criteria:**

- Users can archive any active task
- Archived tasks disappear from active view immediately
- Users can access archived tasks via "View Archived" toggle/section
- Users can restore archived tasks back to active list
- Archive/restore operations persist to database
- Archived tasks maintain all original data (text, creation date, sort order)

## Technical Foundation

**Existing System Context:**

- Database: `tasks` table with `archivedAt` field (nullable timestamp)
- Active tasks: `archivedAt = null`
- Archived tasks: `archivedAt = timestamp`
- API: Fastify REST endpoints at `/api/tasks`
- Frontend: React components rendering task list

**Archive Implementation Approach:**

- Use existing `archivedAt` column (already in schema from Epic 1)
- Archive = set `archivedAt` to current timestamp
- Restore = set `archivedAt` to null
- No data deletion - archive is reversible

## Stories

### Story 2.1: Backend Archive and Restore Endpoints

**Goal:** Implement API endpoints to archive and restore tasks using the `archivedAt` timestamp field.

**Acceptance Criteria:**

- `PATCH /api/tasks/:id/archive` endpoint sets `archivedAt` to current timestamp
- `PATCH /api/tasks/:id/restore` endpoint sets `archivedAt` to null
- Both endpoints validate task exists before updating
- Both endpoints return updated task object
- `GET /api/tasks` endpoint filters to only active tasks (`archivedAt = null`)
- `GET /api/tasks/archived` endpoint returns only archived tasks (`archivedAt != null`)
- All endpoints include proper error handling (404 for missing tasks)
- Schema validation on all request parameters

### Story 2.2: Archive Task from Active List

**Goal:** Add archive action to active tasks in the frontend, removing tasks from active view when archived.

**Acceptance Criteria:**

- Each active task displays an archive button/icon (e.g., checkbox, archive icon)
- Click on archive button calls API to archive task
- Optimistic UI update removes task from active list immediately
- Archived task disappears from view without page reload
- Error handling restores task to active list if API call fails
- Visual feedback during archive operation (loading state)
- Archive action accessible via keyboard (for accessibility)

### Story 2.3: View and Restore Archived Tasks

**Goal:** Create interface to view archived tasks and restore them back to active list.

**Acceptance Criteria:**

- "View Archived" toggle/button visible on main screen
- Clicking toggle displays archived tasks section
- Archived tasks list shows all archived tasks with restore action
- Each archived task displays restore button/icon
- Click on restore button calls API to restore task
- Optimistic UI update moves task back to active list immediately
- Restored task appears in active list (preserving original sort order)
- Toggle allows switching back to active-only view
- Archived section clearly distinguishable from active tasks (styling/layout)
- No archived tasks message displayed when archive is empty

## Dependencies

**External Dependencies:**

- **Epic 1 (Core Task Management) must be complete:** Database schema, API foundation, and task display functionality are required.

**Internal Dependencies:**

- Story 2.1 must complete before 2.2 and 2.3
- Stories 2.2 and 2.3 can run in parallel after 2.1

## Compatibility Requirements

- [ ] Existing `GET /api/tasks` behavior unchanged (returns active tasks only)
- [ ] Database schema unchanged (uses existing `archivedAt` field from Epic 1)
- [ ] Existing task add/edit functionality unaffected
- [ ] Performance impact minimal (archive operations < 50ms API response)

## Non-Functional Requirements

**From PRD:**

- NFR2: Archive/restore operations provide perceived instant feedback (< 100ms UI response via optimistic updates)
- NFR3: Archive functionality works in all supported browsers
- NFR4: Archive UI components contribute minimally to bundle size

**Additional Considerations:**

- Progressive disclosure: Archived tasks hidden by default keeps UI uncluttered
- Forgiving interactions: Archive is reversible (no permanent deletion)

## Definition of Done

- [ ] All 3 stories completed with acceptance criteria met
- [ ] Archive and restore API endpoints functional
- [ ] Active task list shows archive action
- [ ] Archived tasks view accessible and functional
- [ ] Restore action returns tasks to active list
- [ ] Optimistic UI updates working for archive and restore
- [ ] Data persistence verified (archived state survives page reload)
- [ ] Error handling graceful for failed operations
- [ ] Manual testing completed (archive → reload → verify archived, restore → verify active)
- [ ] Existing Epic 1 functionality verified unaffected

## Risk Assessment

**Primary Risk:** Archived tasks list could grow very large, impacting UI performance if all archived tasks are loaded at once.

**Mitigation:**

- For MVP, load all archived tasks (acceptable given in-memory database and single-user scope)
- Document as future enhancement: pagination or lazy loading for archived tasks if needed post-MVP

**Rollback Plan:**

- Archive feature is purely additive - can be disabled by hiding archive buttons in frontend
- Archived data remains in database with `archivedAt` timestamps intact for future use
