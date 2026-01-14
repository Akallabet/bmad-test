# Simple To-Do App to Demonstrate the BMAD Method Product Requirements Document (PRD)

## Goals and Background Context

### Goals

- Deliver a working to-do app deployed to production within 2 hours (from spec completion to deployment)
- Create a compelling portfolio artifact demonstrating end-to-end capability (ideation → architecture → deployment)
- Demonstrate that the BMAD methodology + AI-assisted development accelerates delivery without sacrificing code quality
- Establish a reusable workflow template for future rapid prototyping projects
- Prove capability to ship complete, functional products independently

### Background Context

This project addresses a gap in developer portfolios: most showcase either code without context (repositories) or process without results (case studies), but rarely both. This to-do application serves as a living demonstration of the BMAD (BMad Method) combined with Claude Code for AI-assisted development.

The app itself is intentionally simple—five core features (Add, Edit, Archive, Restore, Sort)—because the product is not the feature set, it's the *method*. The 2-hour build constraint forces ruthless prioritization and proves that structured thinking accelerates rather than impedes velocity. The complete artifacts (PRD, Architecture, Stories, code) will be publicly accessible, making this both a functional app and a methodology showcase for developers, potential clients, and employers.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| 2026-01-13 | v1.0 | Initial PRD creation from Project Brief | PM Agent (John) |

## Requirements

### Functional

1. **FR1:** The system shall provide a text input field to add new tasks with one-click or Enter key submission
2. **FR2:** The system shall allow users to edit task text inline by clicking on the task, with save on blur or Enter key, and cancel on Escape
3. **FR3:** The system shall allow users to archive tasks, moving them out of the active view while preserving data
4. **FR4:** The system shall allow users to restore archived tasks back to the active task list via a "View Archived" section
5. **FR5:** The system shall support sorting tasks by creation date (newest/oldest), alphabetical order (A-Z/Z-A), or manual drag-and-drop reordering
6. **FR6:** The system shall display a dismissible welcome message for first-time visitors explaining the app's purpose and how to get started
7. **FR7:** The system shall persist all task data to a database, ensuring tasks survive page reloads and sessions
8. **FR8:** The system shall include a visible link (in footer or About section) to the GitHub repository containing full BMAD documentation (PRD, Architecture, Epics, Stories)
9. **FR9:** The system shall provide a minimalistic, uncluttered user interface with responsive design for desktop and mobile devices

### Non Functional

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

## User Interface Design Goals

### Overall UX Vision

The application embraces radical simplicity—a single-page interface where the task list is the hero. No unnecessary navigation, no feature overload, no cognitive friction. Users should feel the app "gets out of their way" while still being delightful to use. The design communicates competence and focus: clean typography, generous whitespace, subtle interactions. The UX should feel like a calm workspace, not a cluttered dashboard.

**Key principle:** The interface disappears—users think about their tasks, not the app.

### Key Interaction Paradigms

- **Inline editing:** Click any task to edit directly in place (no modal dialogs or separate edit screens)
- **Immediate feedback:** All actions (add, edit, archive, restore) show instant visual confirmation before server sync
- **Progressive disclosure:** Archived tasks hidden by default, revealed via "View Archived" toggle—keeps active list uncluttered
- **Forgiving interactions:** Clear undo/cancel affordances (Escape key cancels edit, archive is reversible via restore)
- **Minimal chrome:** No excessive buttons or UI elements—each control serves a clear purpose

### Core Screens and Views

1. **Main Task List View** (Primary screen)
   - Active tasks with add input at top
   - Sort controls (dropdown or button group for Date/Alphabetical/Manual)
   - Archive action per task (icon button or checkbox)
   - Inline edit on click
   - Footer with link to GitHub specs

2. **Archived Tasks View** (Overlay or collapsible section)
   - List of archived tasks with restore action
   - Back to active view control
   - Simple, non-distracting design

3. **Welcome Message** (First-visit overlay or banner)
   - Brief explanation of app purpose and BMAD demonstration
   - "Get Started" or dismiss action
   - Shown once per browser (localStorage tracking)

**Note:** These are conceptual views, not separate pages—likely implemented as a single-page app with conditional rendering.

### Accessibility: None (MVP scope)

Given the 2-hour constraint, formal WCAG compliance is out of scope. However, basic semantic HTML practices (proper heading hierarchy, button elements, keyboard navigation for editing) will provide foundational accessibility without explicit audit/testing.

### Branding

**Style: Minimalist Portfolio Aesthetic**

- Clean, modern typography (system fonts for performance: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)
- Neutral color palette with subtle accent color (e.g., blues/grays with one brand accent for CTAs)
- No heavy branding elements—the app itself is the brand statement
- Emphasis on whitespace and readability over visual flair

**Tone:** Professional but approachable, efficient but not sterile

### Target Device and Platforms: Web Responsive

**Desktop-first, mobile-friendly**

- Desktop browsers: 1280px+ (primary design target)
- Tablets: 768px-1024px (responsive layout)
- Mobile: 375px-767px (stacked layout, touch-optimized interactions)

Primary evaluation happens on desktop browsers (developers reviewing code, clients assessing portfolio). Mobile responsiveness demonstrates technical competence without requiring separate mobile app development.

## Technical Assumptions

### Repository Structure: Monorepo

Use a monorepo structure with npm workspaces (or pnpm workspaces).

**Structure:**
```
/packages/web - React frontend (React Router v7)
/packages/api - Fastify backend
/packages/shared - Shared TypeScript types (if needed)
Root-level configuration (ESLint, TypeScript, package.json)
```

**Rationale:** Single repository simplifies development workflow during 2-hour sprint. Shared types between frontend and backend ensure type safety across API boundaries. Easy deployment: both packages can be built and deployed from root.

### Service Architecture

**Decision:** Monolith - Single backend service with REST API

- Fastify server exposing RESTful endpoints (`/api/tasks`, `/api/tasks/:id`, etc.)
- Frontend served as static build (Vite production build)
- SQLite in-memory database running within the Fastify process
- No microservices, no separate database server

**Rationale:** Simplest possible architecture for 2-hour constraint. Zero infrastructure provisioning. Single deployment unit—one `flyctl deploy` command.

**Known Limitations:** In-memory database means data doesn't persist across server restarts. All users share the same database instance.

**Future Evolution Path:** Easy to migrate from in-memory SQLite to persistent SQLite file or PostgreSQL by changing Drizzle connection string.

### Testing Requirements

**Decision:** Manual testing only for MVP, no automated test suite

**Scope:**
- Manual end-to-end testing in Chrome (desktop) and one mobile browser
- Functional verification of all five core features
- No unit tests, no integration tests, no E2E automation

**Rationale:** Writing and maintaining tests would consume 20-30% of the 2-hour window. For a portfolio demonstration, working software > test coverage.

**Post-MVP Recommendation:** Add Jest + React Testing Library for frontend, Vitest for backend, and Playwright for E2E as Phase 2 improvements.

### Additional Technical Assumptions and Requests

**Frontend Technology Stack:**
- **Framework:** React 19 with React Router v7 (for routing and data loading patterns)
- **Build Tool:** Vite (fast development server, optimized production builds)
- **Styling:** Vanilla CSS or minimal utility-first CSS
- **State Management:** React built-in `useState`, `useEffect`, React Router loaders/actions
- **HTTP Client:** Native `fetch` API
- **TypeScript:** Strict mode enabled

**Backend Technology Stack:**
- **Runtime:** Node.js 24 (LTS)
- **Framework:** Fastify (chosen for performance and modern async/await patterns)
- **Database:** SQLite in-memory (`:memory:`) with Drizzle ORM
- **Migrations:** Drizzle Kit for schema migrations (run at server startup)
- **Validation:** Fastify schema validation
- **TypeScript:** Strict mode enabled

**Database Schema (Preliminary):**
- Single `tasks` table with columns:
  - `id` (primary key, integer auto-increment or UUID)
  - `text` (string, task content)
  - `createdAt` (timestamp, for date sorting)
  - `archivedAt` (nullable timestamp, null = active, non-null = archived)
  - `sortOrder` (integer, for manual sorting)
- Drizzle schema defined in TypeScript, migrations auto-generated by Drizzle Kit

**Deployment:**
- **Platform:** Fly.io (free tier or minimal paid tier, budget $0-50/month)
- **Domain:** Use Fly.io default `.fly.dev` subdomain
- **HTTPS:** Enforced by default via Fly.io
- **Deployment Method:** `flyctl launch` and `flyctl deploy` via CLI

**Development Tooling:**
- **Version Control:** Git with minimal commit history during 2-hour sprint
- **IDE:** VS Code (or similar) with TypeScript support
- **Linting:** ESLint for both frontend and backend
- **Formatting:** Prettier for code formatting

**Security & Validation:**
- **Input Validation:** Fastify schema validation on all POST/PUT/PATCH endpoints
- **XSS Prevention:** React's default JSX escaping
- **SQL Injection Prevention:** Drizzle ORM parameterized queries
- **Rate Limiting:** Fastify rate-limit plugin

**Performance Targets:**
- Frontend bundle size: < 200KB gzipped
- API response time: < 50ms for CRUD operations
- Perceived UI latency: < 100ms (optimistic updates)

**Not Included (Explicitly Out of Scope):**
- Authentication/Authorization
- Real-time updates (WebSockets/SSE)
- Search functionality
- Tags and filtering
- Export/download features
- PWA features
- Analytics or error tracking services
- Database backups or persistence
