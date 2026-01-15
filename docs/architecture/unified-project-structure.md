# Unified Project Structure

```
todo-bmad-demo/
├── .github/
│   └── workflows/
│       ├── ci.yml                    # CI pipeline (future)
│       └── deploy.yml                # Deployment workflow (future)
├── packages/
│   ├── web/                          # Frontend application
│   │   ├── public/                   # Static assets
│   │   │   └── favicon.ico
│   │   ├── src/
│   │   │   ├── components/           # React components
│   │   │   │   ├── TaskList/
│   │   │   │   ├── TaskItem/
│   │   │   │   ├── AddTask/
│   │   │   │   ├── ArchivedTasks/
│   │   │   │   ├── WelcomeMessage/
│   │   │   │   └── shared/
│   │   │   ├── hooks/                # Custom React hooks
│   │   │   │   ├── useTasks.ts
│   │   │   │   └── useOptimisticUpdate.ts
│   │   │   ├── routes/               # React Router routes
│   │   │   │   ├── root.tsx
│   │   │   │   ├── index.tsx
│   │   │   │   ├── archived.tsx
│   │   │   │   └── _error.tsx
│   │   │   ├── services/             # API client services
│   │   │   │   └── taskService.ts
│   │   │   ├── styles/               # Global styles
│   │   │   │   ├── global.css
│   │   │   │   └── variables.css
│   │   │   ├── utils/                # Frontend utilities
│   │   │   │   └── dateFormat.ts
│   │   │   ├── main.tsx              # App entry point
│   │   │   └── vite-env.d.ts
│   │   ├── index.html                # HTML template
│   │   ├── vite.config.ts            # Vite configuration
│   │   ├── tsconfig.json             # TypeScript config
│   │   └── package.json
│   ├── api/                          # Backend application
│   │   ├── src/
│   │   │   ├── routes/               # API route handlers
│   │   │   │   ├── tasks.ts
│   │   │   │   └── health.ts
│   │   │   ├── services/             # Business logic
│   │   │   │   └── taskService.ts
│   │   │   ├── db/                   # Database layer
│   │   │   │   ├── client.ts
│   │   │   │   ├── schema.ts
│   │   │   │   ├── queries.ts
│   │   │   │   └── migrations/
│   │   │   ├── middleware/           # Fastify middleware
│   │   │   │   └── errorHandler.ts
│   │   │   ├── server.ts             # Fastify setup
│   │   │   └── index.ts              # Entry point
│   │   ├── drizzle.config.ts         # Drizzle configuration
│   │   ├── tsconfig.json
│   │   └── package.json
│   └── shared/                       # Shared types and schemas
│       ├── src/
│       │   ├── types/                # TypeScript types
│       │   │   └── task.ts
│       │   ├── schemas/              # Zod schemas
│       │   │   └── task.schema.ts
│       │   ├── constants/            # Shared constants
│       │   │   └── api.ts
│       │   └── index.ts
│       ├── tsconfig.json
│       └── package.json
├── docs/                             # BMAD documentation
│   ├── prd.md                        # Product Requirements Document
│   ├── architecture.md               # This file
│   ├── brief.md                      # Original project brief
│   └── stories/                      # User stories (future)
├── .env.example                      # Environment variables template
├── .gitignore
├── fly.toml                          # Fly.io configuration
├── pnpm-workspace.yaml               # pnpm workspace config
├── package.json                      # Root package.json
├── tsconfig.json                     # Root TypeScript config
└── README.md                         # Project documentation
```

**Key Structure Decisions:**

- **pnpm Workspaces:** Root `pnpm-workspace.yaml` defines packages, enables shared dependencies
- **TypeScript Paths:** `@todo-app/shared` import alias configured in each package's tsconfig
- **Collocated Tests:** Test files live next to source files (e.g., `TaskItem.test.tsx` next to `TaskItem.tsx`)
- **Flat Component Structure:** Components organized by feature, not nested deeply
- **Shared Package First:** Types and schemas defined once, imported by both web and api
