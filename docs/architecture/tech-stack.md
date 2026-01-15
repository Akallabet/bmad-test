# Tech Stack

## Technology Stack Table

| Category | Technology | Version | Purpose | Rationale |
|----------|-----------|---------|---------|-----------|
| Frontend Language | TypeScript | 5.7.x | Type-safe JavaScript for frontend development | Catches type errors at compile time, enables refactoring confidence, improves IDE autocomplete |
| Frontend Framework | React | 19.x | UI component library with modern hooks and concurrent features | Industry standard, excellent ecosystem, React 19 brings improved server components and concurrent rendering |
| UI Component Library | None (Custom CSS) | N/A | Minimal styling without component library overhead | Keeps bundle size minimal (<200KB target), demonstrates CSS skills, avoids learning shadcn/MUI/Chakra |
| State Management | React useState + React Router | Built-in | Local component state and URL-driven global state | No Redux/Zustand needed for simple CRUD - React Router loaders/actions handle data fetching patterns |
| Backend Language | TypeScript | 5.7.x | Type-safe JavaScript for backend development | Shared language between frontend/backend, type safety for API logic |
| Backend Framework | Fastify | 5.2.x | High-performance Node.js web framework | 2x faster than Express, modern async/await patterns, excellent TypeScript support, schema validation built-in |
| Validation Library | Zod | 3.24.x | TypeScript-first schema validation library | Runtime validation, type inference, OpenAPI generation via @fastify/type-provider-zod |
| API Style | REST | N/A | RESTful HTTP endpoints for CRUD operations | Simple, well-understood, no learning curve; sufficient for straightforward entity operations |
| Database | SQLite | 3.x (better-sqlite3) | Embedded SQL database running in-memory | Zero infrastructure setup, SQL familiarity, easy migration path to persistent file or PostgreSQL |
| ORM | Drizzle ORM | 0.39.x | Type-safe database queries and migrations | Lightweight (vs Prisma), generates TypeScript types from schema, supports migrations, no runtime overhead |
| Cache | None | N/A | No caching layer for MVP | In-memory database is already fast enough (<50ms API response target); caching adds complexity |
| File Storage | None | N/A | No file upload functionality in MVP | Out of scope per PRD requirements |
| Authentication | None | N/A | No authentication for MVP | Explicitly excluded per NFR10 - single-user shared state application |
| Frontend Testing | None (Manual) | N/A | Manual testing only for MVP | 2-hour constraint eliminates automated test development time |
| Backend Testing | None (Manual) | N/A | Manual testing only for MVP | 2-hour constraint eliminates automated test development time |
| E2E Testing | None (Manual) | N/A | Manual browser testing only | 2-hour constraint eliminates Playwright/Cypress setup time |
| Package Manager | pnpm | 9.x | Fast, disk-efficient package manager with workspace support | 3x faster than npm, content-addressable storage saves disk space, strict node_modules prevents phantom dependencies |
| Build Tool | Vite | 6.x | Frontend build tool and dev server | Fastest dev server, optimized production builds, native ESM, excellent TypeScript support |
| Bundler | Rollup (via Vite) | Built-in | Production bundler for frontend | Vite uses Rollup under the hood; best-in-class tree shaking and code splitting |
| IaC Tool | None (Fly.io CLI) | N/A | Infrastructure via Fly.io dashboard and flyctl | No Terraform/Pulumi needed - Fly.io's `fly.toml` configuration is sufficient |
| CI/CD | None (Manual Deploy) | N/A | Manual deployment via flyctl for MVP | GitHub Actions setup would consume 15-20 minutes of 2-hour window |
| Monitoring | Fly.io Metrics | Built-in | Basic request metrics and health checks | Fly.io provides basic monitoring; no Datadog/New Relic needed for demo |
| Logging | Console (stdout) | Built-in | Structured logging to stdout, captured by Fly.io | Fastify's built-in logger (Pino) outputs JSON logs; Fly.io captures and displays them |
| CSS Framework | Vanilla CSS | N/A | Custom CSS with CSS variables for theming | No Tailwind setup time, demonstrates CSS fundamentals, sufficient for minimal UI |
