# Requirements

## Functional

1. **FR1:** The system shall provide a text input field to add new tasks with one-click or Enter key submission
2. **FR2:** The system shall allow users to edit task text inline by clicking on the task, with save on blur or Enter key, and cancel on Escape
3. **FR3:** The system shall allow users to archive tasks, moving them out of the active view while preserving data
4. **FR4:** The system shall allow users to restore archived tasks back to the active task list via a "View Archived" section
5. **FR5:** The system shall support sorting tasks by creation date (newest/oldest), alphabetical order (A-Z/Z-A), or manual drag-and-drop reordering
6. **FR6:** The system shall display a dismissible welcome message for first-time visitors explaining the app's purpose and how to get started
7. **FR7:** The system shall persist all task data to a database, ensuring tasks survive page reloads and sessions
8. **FR8:** The system shall include a visible link (in footer or About section) to the GitHub repository containing full BMAD documentation (PRD, Architecture, Epics, Stories)
9. **FR9:** The system shall provide a minimalistic, uncluttered user interface with responsive design for desktop and mobile devices

## Non Functional

1. **NFR1:** The application shall load the initial page in under 2 seconds on standard broadband connections
2. **NFR2:** Task operations (add, edit, archive, restore) shall provide perceived instant feedback (< 100ms UI response)
3. **NFR3:** The application shall support modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions) and mobile browsers (iOS Safari, Chrome Mobile)
4. **NFR4:** The frontend bundle size shall not exceed 200KB gzipped
5. **NFR5:** The system shall use SQLite in-memory database (`:memory:`) with Drizzle ORM for type-safe database access
6. **NFR6:** The system shall implement input validation and sanitization to prevent XSS attacks, using React's default escaping
7. **NFR7:** The system shall prevent SQL injection via Drizzle's parameterized queries
8. **NFR8:** The API shall enforce rate limiting on endpoints to prevent abuse
9. **NFR9:** The application shall enforce HTTPS via Fly.io's default configuration
10. **NFR10:** The MVP shall not implement user authentication (single-user application with in-memory shared state)
