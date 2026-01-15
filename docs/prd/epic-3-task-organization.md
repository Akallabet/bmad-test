# Epic 3: Task Organization

## Epic Goal

Provide flexible task sorting options (creation date, alphabetical, manual drag-and-drop) to help users organize their task list according to their preferences.

## Epic Description

**Context:**

With core task management (Epic 1) and archive management (Epic 2) in place, users need ways to organize their active tasks. Different users have different organizational preferences - some prefer chronological order, others alphabetical, and some want full manual control.

**What's Being Built:**

- Sort controls UI (dropdown or button group)
- Sort by creation date (newest first / oldest first)
- Sort alphabetically (A-Z / Z-A)
- Manual drag-and-drop reordering
- Persistence of sort preference and manual order
- API support for updating sort order

**Success Criteria:**

- Users can select from multiple sort options via UI controls
- Sort by date orders tasks by `createdAt` timestamp (ascending/descending)
- Sort alphabetically orders tasks by `text` field (A-Z or Z-A)
- Manual sort allows drag-and-drop reordering
- Manual sort order persists using `sortOrder` field in database
- Selected sort preference persists across page reloads (localStorage)
- Sort operations feel instant (optimistic UI updates)

## Technical Foundation

**Existing System Context:**

- Database: `tasks` table with `createdAt` (timestamp) and `sortOrder` (integer) fields
- API: `GET /api/tasks` returns task list, `PUT /api/tasks/:id` updates task
- Frontend: React components rendering task list
- Task list currently displays in creation order (default database order)

**Sort Implementation Approach:**

- **Date/Alphabetical sorts:** Client-side sorting of task array (no API changes needed)
- **Manual sort:** Uses `sortOrder` field, requires API endpoint to bulk update order
- **Preference persistence:** localStorage stores selected sort mode
- **Default behavior:** Newest first (creation date descending)

## Stories

### Story 3.1: Sort by Date (Newest/Oldest)

**Goal:** Implement date-based sorting of tasks with toggle between newest-first and oldest-first.

**Acceptance Criteria:**

- Sort control UI added to main task list view (dropdown or button group)
- "Sort by Date" option available with "Newest First" and "Oldest First" modes
- Selecting "Newest First" sorts tasks by `createdAt` descending (newest at top)
- Selecting "Oldest First" sorts tasks by `createdAt` ascending (oldest at top)
- Sort happens client-side (no API call required)
- Currently selected sort mode visually indicated in UI
- Sort preference saved to localStorage
- Saved preference applied automatically on page load
- Newly added tasks appear in correct position based on current sort mode
- Edited tasks remain in position (date doesn't change on edit)

### Story 3.2: Sort Alphabetically (A-Z / Z-A)

**Goal:** Implement alphabetical sorting of tasks by task text.

**Acceptance Criteria:**

- "Sort Alphabetically" option added to sort controls
- "A-Z" mode sorts tasks alphabetically by `text` field (case-insensitive)
- "Z-A" mode sorts tasks reverse alphabetically (case-insensitive)
- Sort happens client-side (no API call required)
- Selected alphabetical sort mode visually indicated in UI
- Sort preference saved to localStorage
- Saved preference applied automatically on page load
- Newly added tasks appear in correct alphabetical position
- Edited tasks re-sort automatically based on new text content
- Special characters and numbers handled gracefully (Unicode collation)

### Story 3.3: Manual Drag-and-Drop Reordering

**Goal:** Enable users to manually reorder tasks via drag-and-drop, persisting custom order to database.

**Acceptance Criteria:**

- "Manual Sort" option added to sort controls
- When manual sort selected, tasks become draggable
- Drag-and-drop interface allows reordering tasks
- Drag handle or affordance indicates draggable area
- Drop zones clearly indicated during drag
- Optimistic UI update shows new order immediately on drop
- `PATCH /api/tasks/reorder` endpoint accepts array of {id, sortOrder} pairs
- Backend updates `sortOrder` field for affected tasks
- Manual order persists across page reloads
- Switching to date/alphabetical sort disables drag-and-drop
- Switching back to manual sort restores last manual order
- Touch-friendly drag-and-drop for mobile devices
- Visual feedback during drag operation (ghost element, drag handle)

### Story 3.4: Backend Support for Manual Sort Order

**Goal:** Implement API endpoint to persist manual sort order when users drag-and-drop tasks.

**Acceptance Criteria:**

- `PATCH /api/tasks/reorder` endpoint created
- Endpoint accepts array payload: `[{id: 1, sortOrder: 0}, {id: 2, sortOrder: 1}, ...]`
- Endpoint validates all task IDs exist
- Endpoint updates `sortOrder` field for each task in single transaction
- Endpoint returns success/failure status
- Schema validation on request payload
- Error handling for invalid task IDs
- Rate limiting applied (prevent abuse of bulk updates)
- When `GET /api/tasks` returns tasks, include `sortOrder` field
- When manual sort active, frontend sorts by `sortOrder` ascending

## Dependencies

**External Dependencies:**

- **Epic 1 (Core Task Management) must be complete:** Task list display and database schema required.
- Epic 2 (Archive Management) should be complete: Sorting applies to active tasks only.

**Internal Dependencies:**

- Story 3.4 must complete before 3.3 (backend API needed for manual sort persistence)
- Stories 3.1 and 3.2 can run in parallel (both client-side only)
- Story 3.3 depends on 3.4 completion

## Compatibility Requirements

- [ ] Existing task add/edit/archive functionality unaffected
- [ ] Database schema unchanged (uses existing `createdAt` and `sortOrder` fields)
- [ ] API changes are additive (new endpoint only, existing endpoints unchanged)
- [ ] Performance impact minimal (client-side sorts near-instant, API reorder < 100ms)

## Non-Functional Requirements

**From PRD:**

- NFR2: Sort operations provide perceived instant feedback (< 100ms)
- NFR3: Drag-and-drop works in all supported browsers and mobile browsers
- NFR4: Drag-and-drop library (if used) contributes minimally to bundle size

**Additional Considerations:**

- Accessibility: Keyboard alternative for manual reordering (e.g., up/down arrow keys)
- Mobile: Touch-friendly drag-and-drop gestures
- Performance: Sorting should handle reasonable task counts (< 1000 tasks) without lag

## Definition of Done

- [ ] All 4 stories completed with acceptance criteria met
- [ ] Date sorting functional (newest/oldest)
- [ ] Alphabetical sorting functional (A-Z/Z-A)
- [ ] Manual drag-and-drop reordering functional
- [ ] Backend API endpoint for sort order persistence working
- [ ] Sort preferences persist across page reloads (localStorage)
- [ ] Manual sort order persists in database
- [ ] Sort controls intuitive and visually clear
- [ ] Mobile drag-and-drop tested and working
- [ ] Keyboard accessibility for manual sort verified
- [ ] Manual testing completed in Chrome (desktop) and one mobile browser
- [ ] Existing Epic 1 and Epic 2 functionality verified unaffected

## Risk Assessment

**Primary Risk:** Drag-and-drop library adds significant bundle size, violating NFR4 (< 200KB gzipped).

**Mitigation:**

- First attempt: Use native HTML5 drag-and-drop API (zero library overhead)
- If native API insufficient: Evaluate lightweight libraries (react-beautiful-dnd alternatives)
- Monitor bundle size during implementation - halt if approaching 200KB limit
- Fallback: Defer drag-and-drop to post-MVP if bundle size becomes blocker

**Secondary Risk:** Manual sort order conflicts when multiple users access same in-memory database.

**Mitigation:**

- Document as known limitation (single-user MVP assumption from PRD NFR10)
- Last write wins - acceptable for MVP demonstration
- Post-MVP: Add user authentication to isolate sort preferences per user

**Rollback Plan:**

- Manual sort is independent feature - can be disabled by removing sort option from UI
- Date and alphabetical sorts are client-side only - can be removed without API changes
