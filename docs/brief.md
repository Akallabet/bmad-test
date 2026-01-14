# Project Brief: Simple To-Do App to Demonstrate the BMAD Method

---

## Executive Summary

A simple, working to-do app built from scratch and deployed to production in 2 hours.

This project demonstrates that structured thinking and modern AI tools can accelerate development rather than slow it down. The app includes clean code, full specifications (PRD, Architecture, Stories), and all the core features needed for real use: add, edit, archive, restore, and sort tasks.

**For developers:** See how quality and speed coexist
**For clients:** See what's possible with focused execution
**For myself:** The first step toward building bolder projects independently

---

## Problem Statement

As a developer transitioning to independent work, I need a compelling portfolio piece that demonstrates end-to-end capability—from ideation through deployment—in a way that builds credibility with potential clients and employers.

Traditional portfolio projects either showcase code without context (GitHub repos with no story) or showcase process without results (case studies with no live product). Neither proves the complete capability: strategic thinking + clean execution + shipping discipline.

**This project solves that by creating a living artifact:** a simple application with full documentation (PRD, Architecture, Stories), clean code, and public deployment—all completed in a constrained timeframe that proves focus and efficiency.

---

## Proposed Solution

### Core Concept

Build a minimalistic to-do application using a structured methodology (BMAD) paired with AI-assisted development (Claude Code). The solution is both the working application AND the documented process that created it—demonstrating that systematic thinking accelerates rather than impedes delivery.

### Technical Approach

- **Stack:** Node.js 24, Fastify (backend), React Router v7 (frontend), monorepo structure
- **Deployment:** Fly.io (publicly accessible, production-ready)
- **Development Process:** Follow BMAD workflow—PRD → Architecture → Epics → Stories → Implementation
- **Code Quality:** Clean, readable structure with no over-abstraction; code as portfolio

### Key Differentiators

**1. Time-Constrained Proof**
Unlike typical demo apps with undefined timelines, this project has a hard 2-hour constraint from spec completion to deployment. This forces ruthless prioritization and proves efficiency.

**2. Full Process Visibility**
Every artifact (brainstorming results, PRD, architecture docs, epics, stories) is documented and accessible. Viewers see the complete journey, not just the destination.

**3. Meta-Demonstration**
The app includes a link to its own specifications—a self-referential showcase of the BMAD method. The documentation isn't hidden; it's part of the product.

**4. Simplicity as Strategy**
Rather than competing on features, this app demonstrates mastery through restraint. Five core functions (add, edit, archive, restore, sort) done exceptionally well.

### Why This Will Succeed

- **Proven Stack:** Leveraging technologies you already know (Node.js, Fastify, React Router v7) eliminates learning curve
- **Clear Constraints:** The 2-hour limit forces focus and prevents scope creep
- **Genuine Need:** Solves your actual problem (portfolio building) rather than a hypothetical market need
- **Repeatable Method:** If successful, this becomes a template for building other projects quickly

---

## Target Users

This application serves three distinct user segments, each evaluating different aspects of the project.

### Primary User Segment: Developers Evaluating BMAD/AI-Assisted Development

**Profile:**
- Mid to senior-level developers (5+ years experience)
- Interested in modern development workflows and AI tooling
- Skeptical of "productivity methodologies" but open to proof
- Values clean code over documentation promises

**Current Behaviors:**
- Reads code repositories before README files
- Judges projects by implementation quality, not claims
- Seeks practical examples of new tools/methods in action
- Looks for signal in the noise of productivity content

**Needs & Pain Points:**
- Wants to see if AI + structured process is actually faster than their current workflow
- Needs concrete examples, not abstract methodology explanations
- Curious about how agents interact with code and each other
- Tired of over-engineered demo apps that don't reflect real constraints

**Goals:**
- Evaluate whether BMAD methodology is worth learning
- Understand practical application of Claude Code
- Find reusable patterns for their own projects
- See proof that structure doesn't kill velocity

### Secondary User Segment: Potential Clients/Employers

**Profile:**
- Technical decision-makers or hiring managers
- Evaluating developers for contract work or employment
- Looking for evidence of end-to-end capability
- Values shipping discipline and clean execution

**Current Behaviors:**
- Reviews portfolios quickly—looking for standout signals
- Checks if projects are actually deployed (not just GitHub repos)
- Assesses whether developer can think strategically, not just code
- Red-flags: over-complicated solutions to simple problems

**Needs & Pain Points:**
- Needs quick proof that developer can deliver, not just talk
- Wants to see clean code structure (portfolio as code sample)
- Looking for someone who can work independently with minimal oversight
- Concerned about developers who can't prioritize or ship on time

**Goals:**
- Find developers who can take projects from idea to production
- Assess quality of thinking, not just coding skill
- Verify that candidate understands business constraints (time, scope)
- See evidence of focus and efficiency

---

## Goals & Success Metrics

### Business Objectives

- **Complete project from brainstorming to deployed app within timeline** - Target: Deployed to Fly.io within 2 hours post-spec completion (this is the core proof point)
- **Create reusable portfolio artifact** - Target: Project can be shared with 3+ potential clients or included in job applications within 1 week
- **Generate interest in BMAD methodology** - Target: At least 5 developers engage with the documentation/codebase organically
- **Establish template for future projects** - Target: Workflow artifacts (PRD template, architecture patterns) are reusable for next project

### User Success Metrics

**For Developers (Primary Segment):**
- **Code exploration rate** - Target: 70%+ of visitors who view README also explore the codebase
- **Documentation engagement** - Target: Visitors spend time reviewing PRD and Architecture docs (avg 5+ min)
- **Method adoption signal** - Target: At least 2 developers ask questions or express interest in trying BMAD

**For Clients/Employers (Secondary Segment):**
- **Portfolio conversion** - Target: Project leads to at least 1 meaningful conversation with potential client/employer
- **Credibility signal** - Target: Positive feedback on code quality or execution from technical reviewers

**Personal Success (Your Goals):**
- **Confidence boost** - Subjective: Feel capable of shipping complete projects independently
- **Learning integration** - Demonstrate mastery of brainstorming, SDD, and Claude Code as integrated workflow

### Key Performance Indicators (KPIs)

- **Deployment Success:** App is live, publicly accessible, and functional on Fly.io - Binary (Yes/No)
- **Timeline Adherence:** Complete build phase within 2-hour constraint - Measured in actual hours/minutes
- **Code Quality Score:** Clean structure with no over-abstraction - Assessed via peer review or self-audit
- **Artifact Completeness:** All BMAD documents (PRD, Architecture, Epics, Stories) are present and coherent - Binary checklist
- **Public Engagement:** GitHub stars, shares, or direct inquiries - Count over 30 days post-launch

---

## MVP Scope

### Core Features (Must Have)

- **Add Task:** Simple input field to create new tasks. One-click or Enter key submission. No complexity—just text and timestamp.

- **Edit Task:** Click to edit task text inline. Save on blur or Enter. Cancel on Escape. Standard UX pattern.

- **Archive Task:** Move completed or unwanted tasks out of active view. Preserves data without deletion. Single action (button/checkbox).

- **Restore Task:** Bring archived tasks back to active list. Access via "View Archived" section. Inverse of archive action.

- **Sort Tasks:** Order tasks by creation date, alphabetical, or manual drag-and-drop. Toggle between sort modes. Simple dropdown or button group.

- **Welcome Message:** First-time visitor sees a brief welcome explaining the app's purpose and how to get started. Dismissible. Sets the right tone.

- **Persistence:** Tasks saved to database (PostgreSQL or SQLite on Fly.io). Sessions persist across page reloads and devices. Standard CRUD backend.

- **Link to Specs:** Footer or About section contains link to GitHub repository with full BMAD documentation (PRD, Architecture, Epics, Stories). Meta-demonstration feature.

- **Minimalistic UI:** Clean, uncluttered interface. No cognitive overload. Focus on task list, not chrome. Mobile-friendly responsive design.

### Out of Scope for MVP

- **Tags & Filtering:** Categorizing tasks with tags and filtering by category—nice to have but adds complexity. Post-MVP if time permits.

- **Download as .txt:** Exporting task list as plain text file—simple feature but not essential for core demonstration.

- **Confetti Animation:** Celebratory effect on task completion—polish feature for the last 10 minutes if available.

- **Notion Sync:** Two-way integration with Notion databases—ambitious moonshot, not realistic in 2-hour constraint.

- **User Authentication:** Single-user app with local storage or simple session. No login/signup flows.

- **Collaboration Features:** No sharing, commenting, or multi-user access. Personal productivity tool only.

- **Search Functionality:** With sort and archive, search is less critical. Can be added post-MVP.

### MVP Success Criteria

**The MVP is successful when:**

1. **Functional Completeness:** All 5 core features (Add, Edit, Archive, Restore, Sort) work without bugs
2. **Deployed & Accessible:** App is live at a public Fly.io URL and loads correctly
3. **Data Persistence:** Tasks survive page refresh and return visits
4. **Clean Code:** Codebase is readable, well-structured, and free of over-abstraction
5. **Documentation Present:** Link to specs is visible and functional, leading to complete BMAD artifacts
6. **Visual Polish:** UI is clean and usable, even if not pixel-perfect
7. **Timeline Met:** Completed within 2-hour build window (from architecture finalization to deployment)

**Acceptance Definition:** If a developer or potential client visits the app, they should immediately see it as a complete, functional product—not a prototype or work-in-progress.

---

## Post-MVP Vision

### Phase 2 Features

If the MVP proves successful and time allows for iteration, the following features would enhance the app without compromising its core simplicity:

**Tags & Filtering System**
- Add tag labels to tasks (e.g., "work", "personal", "urgent")
- Filter task list by one or more tags
- Quick-add common tags with preset buttons
- Keeps the interface clean while adding organizational power

**Download/Export Functionality**
- Export active tasks as .txt or .md file
- Simple one-click download from menu
- Useful for backup or offline reference
- Low complexity, high utility

**Confetti & Delight Details**
- Celebratory animation when completing tasks
- Small touches that make the app feel polished
- Demonstrates attention to user experience
- Optional toggle for those who prefer minimal

**Quick Stats Dashboard**
- Simple metrics: tasks completed today/this week, total active tasks
- Motivational without being overwhelming
- Single card or widget, not a separate page

### Long-term Vision

**From Demo to Product:**
If this project gains traction, it could evolve from a methodology demonstration into a genuinely useful productivity tool. The long-term vision (6-12 months) includes:

- **Multi-user support with authentication** - Allow teams or individuals to create accounts
- **Mobile app (React Native)** - Native iOS/Android experience using shared codebase patterns
- **Integration ecosystem** - Connect with tools like Notion, Todoist, Google Calendar
- **Themeable interface** - Dark mode, custom color schemes, accessibility options
- **Advanced features** - Recurring tasks, due dates, reminders, subtasks

**The BMAD Method as a Service:**
Beyond this specific app, the bigger vision is using BMAD + AI-assisted development to rapidly prototype and launch multiple products. This to-do app is the first proof point in a portfolio of projects built with the same methodology.

### Expansion Opportunities

**Content & Education:**
- **Blog series:** Document the journey from brainstorming to deployment
- **Video walkthrough:** Screen capture showing Claude Code in action during development
- **Open-source template:** Package the BMAD workflow artifacts as a starter kit for others
- **Consulting/Coaching:** Help other developers adopt structured AI-assisted workflows

**Portfolio Building:**
- Use this project as the first case study in a portfolio site
- Create variations: "Built 3 apps in 6 hours using BMAD" as a portfolio narrative
- Offer workshops or talks on AI-assisted development velocity

**The "Bigger Production Idea":**
From the brainstorming session, this project is explicitly a stepping stone to a larger, more ambitious product. While undefined now, the learning from this project will inform:
- How to scope and estimate AI-assisted projects
- Which tools and patterns provide maximum velocity
- What resonates with developers and clients as proof of capability

---

## Technical Considerations

### Platform Requirements

- **Target Platforms:** Web application (browser-based), responsive design for desktop and mobile
- **Browser/OS Support:** Modern browsers (Chrome, Firefox, Safari, Edge) - last 2 versions. Mobile browsers (iOS Safari, Chrome Mobile). No IE11 support needed.
- **Performance Requirements:**
  - Initial page load < 2 seconds
  - Task operations (add, edit, archive) feel instant (< 100ms perceived)
  - Database queries optimized for sub-50ms response
  - Minimal bundle size - target < 200KB gzipped for frontend

### Technology Preferences

- **Frontend:** React Router v7 (React 19), Vite for build tooling, minimal CSS (no heavy frameworks - vanilla CSS or lightweight utility-first approach)
- **Backend:** Node.js 24, Fastify framework (chosen for performance and simplicity), RESTful API endpoints
- **Database:** SQLite in-memory (`:memory:`). Drizzle ORM for type-safe database access. Drizzle Kit for migrations.
- **Hosting/Infrastructure:** Fly.io for both frontend and backend deployment. Single region to start (expand if needed). Automatic HTTPS, environment variables for config.

**Technology Rationale:**
- Stack choices reflect existing expertise (from brainstorming: "strong tech expertise is an accelerator")
- React Router v7 provides routing + data loading patterns
- Fastify chosen over Express for speed and modern patterns
- SQLite in-memory for instant setup, zero provisioning time (5-10 minute savings vs PostgreSQL)
- Drizzle ORM for lightweight, TypeScript-first database access (simpler than Prisma for this use case)
- Drizzle Kit for schema migrations and future-proofing (easy to switch to persistent database later)
- Fly.io for simplicity and cost-effectiveness

### Architecture Considerations

- **Repository Structure:** Monorepo using npm workspaces or pnpm workspaces
  - `/packages/web` - React frontend
  - `/packages/api` - Fastify backend
  - `/packages/shared` - Shared types/utilities (if needed)
  - Root-level configuration (ESLint, TypeScript, etc.)

- **Service Architecture:**
  - Single backend service exposing REST API
  - Frontend as static build served by Fly.io or via CDN
  - No microservices complexity - keep it simple
  - Database connection pooling for efficiency

- **Integration Requirements:**
  - No third-party integrations for MVP
  - GitHub repository linked from app footer
  - Future: potential for Notion API, export features

- **Security/Compliance:**
  - HTTPS enforced (Fly.io default)
  - Basic input validation and sanitization
  - SQL injection prevention via Drizzle parameterized queries
  - XSS protection via React's default escaping
  - No sensitive user data for MVP (no auth), so minimal compliance concerns
  - Rate limiting on API endpoints to prevent abuse

---

## Constraints & Assumptions

### Constraints

**Budget:**
- $0-50 for initial deployment (Fly.io free tier or minimal paid tier)
- Fly.io free tier includes: 3 shared-cpu-1x 256mb VMs, 3GB persistent volume storage, 160GB outbound data transfer
- Domain: Use Fly.io's default `.fly.dev` subdomain (free) - custom domain out of scope
- Monitoring: Fly.io built-in metrics only, no paid monitoring services
- Error tracking: Console logging only for MVP
- **Hard limit:** Will not proceed if cost exceeds $50/month

**Timeline:**
- **2-hour hard constraint** from architecture finalization to deployed app
- Includes setup, coding, testing, and deployment
- No extensions—the constraint is the proof

**Estimated Time Allocation:**
- Project setup (monorepo, dependencies): 15 minutes
- Database schema design & Drizzle Kit migrations: 10 minutes
- Backend API endpoints (CRUD): 30 minutes
- Frontend components & routing: 40 minutes
- Integration & basic testing: 15 minutes
- Deployment & troubleshooting: 10 minutes
- **TOTAL:** 2 hours

**Contingency:** No explicit buffer time. If any phase runs over, cuts come from frontend polish or testing time.

**Resources:**
- **Your time:** Must be uninterrupted. Context switching kills velocity.
- **No outsourcing:** All code written/generated during the session. No copying from previous projects (beyond standard boilerplate).
- **Claude Code capabilities:** Assumes proficiency with prompting and course-correction if the AI makes mistakes.
- **No pair programming:** Solo execution; no second set of eyes until post-deployment review.
- **Documentation during build:** Minimal inline comments only; detailed docs come after deployment.

**Technical Constraints:**
- Limited to technologies you already know well (Node.js, Fastify, React Router v7)
- Must work on Fly.io infrastructure (no flexibility on hosting)
- No pre-built UI component libraries (keeps bundle small and demonstrates raw capability)
- **TypeScript:** Must use. Helps catch errors quickly, saves debugging time.
- **Testing:** Unit tests are out of scope for the 2-hour window. Manual testing only.
- **CI/CD:** No automated pipelines for MVP. Direct deployment via Fly.io CLI.
- **Version control:** Git commits are minimal during build - focus is shipping, not perfect history.
- **Browser compatibility testing:** Manual check in Chrome + one mobile browser only during 2-hour window.
- **API versioning:** Not implemented for MVP - direct routes like `/api/tasks`, no `/api/v1/`.

### Key Assumptions

**Assumption 1: Timeline Start Definition**
- **Spec finalization = when?** The moment the Architecture document is marked "complete" and approved.
- **Clock starts:** First command to initialize the project repository.
- **Clock stops:** When the Fly.io deployment URL returns a working app with all core features functional.
- **Excluded from timer:** Writing README, creating GitHub repository, post-deployment documentation.

**Assumption 2: Development Environment Ready**
- Node.js 24 installed and verified (`node -v` confirms)
- npm or pnpm available with recent version
- Fly.io CLI installed (`flyctl version` works) and authenticated (`flyctl auth login` completed)
- Git configured with user name and email
- IDE ready (VS Code or similar with TypeScript support)
- Terminal access and familiarity with CLI workflows
- **Pre-flight check:** Run a quick environment verification before starting the timer.

**Assumption 3: Claude Code Effectiveness**
- **What it will help with:** Boilerplate generation, standard CRUD patterns, Drizzle schema, basic React components, repetitive code.
- **What you'll guide:** Architecture decisions, API design, component structure, deployment configuration.
- **Expected friction:** May need 1-2 iterations to get generated code right; you'll refine prompts and edit as needed.
- **Backup plan:** If Claude Code struggles, you can hand-code critical sections - you know the stack.

**Assumption 4: Tech Stack Compatibility**
- React Router v7 works with React 19 (verify compatibility before timer starts)
- Fastify + Drizzle ORM integration is straightforward (standard pattern)
- Vite builds with no configuration surprises
- Node.js 24 is stable enough for Fly.io (check Fly.io docs for Node version support)
- SQLite in-memory (`:memory:`) works immediately with no setup
- **Pre-validation:** Quick proof-of-concept before the timed build (optional but recommended).

**Assumption 5: Deployment Simplification**
- **No database provisioning needed:** SQLite in-memory runs in the app process
- **App deployment:** `flyctl launch` and `flyctl deploy` succeed without major errors.
- **No environment variables for database:** Connection is in-memory, no connection string needed
- **Simpler deployment:** One less moving part = fewer failure points
- **Common issues anticipated:** Build timeouts (increase timeout), wrong Node version (specify in Dockerfile)

**Assumption 6: No Unexpected Blockers**
- **What could go wrong:** Fly.io service outage, npm registry down, critical dependency bug, local machine crash, internet connection drop.
- **Mitigation:** Accept that if a major blocker occurs, the timer pauses and the attempt is rescheduled. This is a demonstration, not a live challenge with no retries.
- **Realistic expectation:** Small bumps (typos, minor bugs) are expected and included in the 2-hour estimate. Major infrastructure failures are force majeure.

**Assumption 7: Definition of "Done"**
- **Must have:**
  - All 5 core features (Add, Edit, Archive, Restore, Sort) work end-to-end.
  - App loads at Fly.io URL without errors.
  - Tasks persist within the session (in-memory during server runtime).
  - UI is usable (not broken, responsive enough).
- **Nice to have (if time):**
  - Welcome message functional.
  - Link to specs visible.
  - Basic visual polish (spacing, colors).
- **Explicitly out of scope:**
  - Pixel-perfect design matching a mockup.
  - Accessibility audit (WCAG compliance).
  - Performance optimization beyond basics.
  - Cross-browser testing beyond Chrome + one mobile browser.
  - Security hardening beyond standard practices.

**Assumption 8: Audience Values Velocity**
- **Developer audience:** Will understand that "built in 2 hours" means MVP-level, not production-hardened.
- **Client audience:** Will be impressed by "working app in 2 hours" and understand it's a demonstration of capability.
- **Not expecting:** Enterprise-grade error handling, comprehensive logging, full test coverage, perfect UX.
- **Expectation management:** The brief, PRD, and README will set context that this is a velocity demonstration.

**Assumption 9: Clarity from Specs**
- **Project Brief (this document):** Provides strategic context and constraints.
- **PRD (next step):** Will detail exact feature specs, API contracts, and acceptance criteria.
- **Architecture Doc (next step):** Will specify tech stack decisions, file structure, and deployment steps.
- **Epic/Story breakdown (next step):** Will provide step-by-step implementation checklist.
- **During build:** If ambiguity arises, you'll make quick judgment calls favoring simplicity and speed.

**Assumption 10: Monorepo Setup Speed**
- Creating the monorepo structure (npm workspaces or pnpm) is fast and doesn't burn significant time.
- Shared types between frontend/backend work without complex build configuration.

**Assumption 11: Database Schema & Migrations**
- Single `tasks` table with Drizzle schema: `id`, `text`, `createdAt`, `archivedAt`, `sortOrder`
- Schema defined in TypeScript with Drizzle ORM
- Drizzle Kit generates SQL migration files from schema
- Migrations run at server startup using Drizzle's migrate API
- **For in-memory database:** Migrations run fresh on each restart
- **Future-proofing:** Same migration approach works when switching to persistent SQLite or PostgreSQL

**Assumption 12: API Design is Straightforward**
- RESTful endpoints: `GET /api/tasks`, `POST /api/tasks`, `PUT /api/tasks/:id`, `PATCH /api/tasks/:id/archive` (or similar)
- No authentication = no JWT middleware, no session management complexity
- JSON in/out, standard HTTP status codes, minimal error handling for MVP

**Assumption 13: Frontend State Management**
- React's built-in `useState` and `useEffect` are sufficient; no need for Redux, Zustand, or other state libraries
- Data fetching via React Router v7's loaders/actions or simple `fetch` calls
- Optimistic UI updates for perceived speed (update UI immediately, sync with server in background)

---

## Risks & Open Questions

### Key Risks

- **Risk: 2-hour timeline proves too aggressive**
  - Description: Even with careful planning, unforeseen complexity in any phase could blow the timeline
  - Impact: High - the entire demonstration value depends on meeting the constraint
  - Mitigation: Ruthless scope cutting if needed; Sort feature is first to drop, followed by welcome message polish

- **Risk: Claude Code underperforms or misunderstands prompts**
  - Description: AI-generated code requires significant debugging or doesn't match architectural vision
  - Impact: Medium - time drain, but you can hand-code as backup
  - Mitigation: Start with well-defined, simple prompts; have fallback plan to write critical sections manually

- **Risk: Fly.io deployment complications**
  - Description: Build failures, timeout errors, or configuration issues during deployment
  - Impact: Medium-High - deployment is the final proof point
  - Mitigation: Test Fly.io deployment with a hello-world app before the timer starts; keep Fly.io docs handy

- **Risk: React Router v7 + React 19 compatibility issues**
  - Description: Bleeding-edge versions may have undocumented quirks or breaking changes
  - Impact: Medium - could require workarounds or version downgrades
  - Mitigation: Run quick compatibility test before timer; be prepared to drop to React 18 if needed

- **Risk: Scope creep during build**
  - Description: Temptation to add "just one more feature" or over-polish the UI
  - Impact: Low-Medium - time drain from core features
  - Mitigation: Strict adherence to MVP checklist; remind yourself "done is better than perfect"

- **Risk: Burnout or focus loss during 2-hour sprint**
  - Description: Mental fatigue, decision paralysis, or context switching derails momentum
  - Impact: Medium - velocity drop in final phases
  - Mitigation: Start well-rested; eliminate distractions; have coffee/snacks ready; trust the process

### Open Questions

- What's the GitHub repository strategy? Public from day one, or private until deployment succeeds?
- Should there be a "practice run" to test the workflow before the official timed attempt?
- How will the app handle concurrent users if it gains traction? (In-memory database = shared state across users)
- Is there a fallback plan if Fly.io free tier is exhausted? Alternative host or pause until quota resets?
- How prominent should the "Built in 2 hours" messaging be? Hero banner, footer note, or separate About page?
- What's the plan for post-deployment improvements? Lock it as-is, or iterate in "Phase 1.5"?
- Should the brainstorming session results be linked from the app, or only the technical docs (PRD, Architecture)?

### Areas Needing Further Research

- **React Router v7 + Vite configuration best practices** - Ensure smooth integration, avoid surprises
- **Drizzle Kit workflow with in-memory SQLite** - Confirm migration strategy works as expected
- **Fly.io Node.js 24 support** - Verify compatibility and any Dockerfile requirements
- **Fastify + Drizzle ORM integration patterns** - Find or create clean connection/query patterns
- **Optimistic UI patterns in React Router v7** - Research loaders/actions for instant feedback UX
- **Fly.io multi-user scaling** - Understand limitations of in-memory database with concurrent access

---

## Appendices

### A. Research Summary

This Project Brief is informed by a structured brainstorming session conducted on 2026-01-13 (full results available at `docs/brainstorming-session-results.md`).

**Key Findings from Brainstorming:**

**Six Thinking Hats Analysis:**
- Core features identified: Add, Edit, Archive, Restore, Sort (Tags/Filter deferred as nice-to-have)
- Primary goal: Demonstrate idea-to-app velocity, not feature richness
- Success criterion: App deployed on Fly.io, publicly accessible and usable
- Risk awareness: Perfectionism and burnout identified as main threats to completion
- Meta-feature opportunity: Link to specs within the app itself

**Five Whys Root Motivation:**
- Surface goal: Learn BMAD, Spec Driven Development, and Claude Code
- Intermediate goal: Become a "one-man band" capable of full-stack delivery
- Deeper goal: Build bolder projects, leave day job, achieve time flexibility
- Root motivation: Personal freedom, purpose, and self-actualization
- **Implication:** This project carries significance beyond its technical scope

**Role Playing Insights:**
- First-time users need immediate clarity and simple onboarding
- Developers judge by code quality first, documentation second
- Potential clients red-flag over-complicated solutions to simple problems
- Future self's advice: "Keep calm. Deep work. Trust the process."

**Strategic Themes:**
- Simplicity over complexity - the app is a vehicle for demonstrating the method
- Code quality speaks louder than documentation promises
- The journey (idea → deployed app) matters as much as the destination
- Deep work and calm focus are essential for success

### B. Stakeholder Input

**Primary Stakeholder:** You (the developer/owner)

**Key Priorities Expressed:**
- Prove capability to ship complete projects independently
- Build portfolio piece that opens doors to client/employer conversations
- Learn and integrate BMAD methodology with AI-assisted development
- Establish a repeatable workflow for future projects
- Avoid burnout while maintaining high standards

**Concerns Raised:**
- Getting stuck on details and missing the forest for the trees
- Over-engineering a simple app (adding unnecessary complexity)
- Timeline pressure leading to poor decisions or incomplete work
- Balancing "demo quality" vs "production quality" expectations

**Decision Authority:**
- All architectural and scope decisions rest with you
- No external stakeholders to consult during the 2-hour build window
- Post-deployment feedback may inform Phase 2 iterations

### C. References

**Brainstorming Documentation:**
- `docs/brainstorming-session-results.md` - Full brainstorming session transcript with techniques and insights

**Technical Documentation (To Be Created):**
- `docs/prd.md` - Product Requirements Document (next step)
- `docs/architecture.md` - Architecture Document (next step)
- `docs/stories/` - Epic and Story breakdowns (next step)

**Technology References:**
- [React Router v7 Documentation](https://reactrouter.com/)
- [Fastify Documentation](https://fastify.dev/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/)
- [Drizzle Kit CLI Reference](https://orm.drizzle.team/docs/kit-overview)
- [Fly.io Documentation](https://fly.io/docs/)
- [Node.js 24 Release Notes](https://nodejs.org/)

**Methodology References:**
- BMAD (BMad Method) - Structured approach to AI-assisted development
- Spec Driven Development - Documentation-first development workflow
- Claude Code - AI pair programming tool by Anthropic

**Inspirational References:**
- TodoMVC - Framework comparison via standardized to-do app
- RealWorld App - "Real world" example application specifications
- Build-in-public movement - Transparent development practices

---

## Next Steps

### Immediate Actions

1. **Review and approve this Project Brief** - Ensure alignment on goals, scope, constraints, and technical approach before proceeding

2. **Create Product Requirements Document (PRD)** - Work with PM agent to translate this brief into detailed feature specifications, user stories, and acceptance criteria

3. **Develop Architecture Document** - Work with Architect agent to define system architecture, technology stack implementation details, file structure, and deployment strategy

4. **Break down into Epics and Stories** - Work with PM/Dev agents to create actionable story tickets with clear tasks and estimated effort

5. **Pre-flight environment check** - Verify development environment readiness:
   - Node.js 24 installed
   - Fly.io CLI authenticated
   - Quick React Router v7 + React 19 compatibility test
   - Optional: Hello World Fly.io deployment test

6. **Schedule the 2-hour build sprint** - Choose a time when you're well-rested, free from distractions, and mentally prepared for deep work

7. **Execute the build** - Follow the BMAD workflow through implementation, testing, and deployment

8. **Post-deployment documentation** - After successful deployment, create README, document learnings, and share results

### PM Handoff

This Project Brief provides the full context for **Simple To-Do App to Demonstrate the BMAD Method**.

**Key Context for PRD Development:**
- The app is a demonstration vehicle, not a feature-rich product
- The 2-hour constraint is a core part of the value proposition
- Simplicity and code quality are more important than feature completeness
- Five core features: Add, Edit, Archive, Restore, Sort
- Technical stack: Node.js 24, Fastify, React Router v7, SQLite in-memory, Drizzle ORM

**Next Step:** Please start in 'PRD Generation Mode', review this brief thoroughly, and work with the user to create the PRD section by section as the template indicates. Ask for any necessary clarification or suggest improvements based on your product expertise.

**Critical Reminders for PRD Phase:**
- Stay true to the minimalist scope - resist feature bloat
- Keep the 2-hour timeline in mind when defining acceptance criteria
- Reference the brainstorming results for feature rationale
- Maintain focus on the "why" (portfolio/capability demonstration) not just the "what"

---

**Project Brief Complete** - Ready for PRD Development Phase

