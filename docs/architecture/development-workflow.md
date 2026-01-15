# Development Workflow

## Local Development Setup

**Prerequisites:**
```bash
# Install Node.js 24 LTS
nvm install 24
nvm use 24

# Install pnpm globally
npm install -g pnpm@9

# Verify installations
node --version  # v24.x.x
pnpm --version  # 9.x.x
```

**Initial Setup:**
```bash
# Clone repository
git clone https://github.com/your-username/todo-bmad-demo.git
cd todo-bmad-demo

# Install all dependencies (pnpm installs for all workspaces)
pnpm install

# Build shared package first (required by web and api)
pnpm --filter @todo-app/shared build

# Generate Drizzle migrations
pnpm --filter @todo-app/api db:generate

# Start development servers (runs both frontend and backend)
pnpm dev
```

**Development Commands:**

```bash
# Start all services concurrently
pnpm dev
# Runs: web dev server (port 5173) + api server (port 3000)

# Start frontend only
pnpm --filter @todo-app/web dev

# Start backend only
pnpm --filter @todo-app/api dev

# Build for production
pnpm build
# Builds: shared → web → api

# Type checking (all packages)
pnpm typecheck

# Lint code (if ESLint configured)
pnpm lint

# Run database migrations
pnpm --filter @todo-app/api db:migrate

# Generate new migration after schema changes
pnpm --filter @todo-app/api db:generate
```

## Environment Configuration

**Frontend Environment Variables:**
```bash
# packages/web/.env.local
VITE_API_BASE_URL=http://localhost:3000/api  # API endpoint for local dev
```

**Backend Environment Variables:**
```bash
# packages/api/.env
PORT=3000                     # Server port
HOST=0.0.0.0                  # Bind to all interfaces
LOG_LEVEL=info                # Logging level (debug, info, warn, error)
NODE_ENV=development          # Environment (development, production)
```

**Shared Environment:**
```bash
# Root .env (if needed)
DATABASE_URL=:memory:         # SQLite in-memory (no actual file)
```

**Environment File Structure:**
- `.env.example` - Template with all variables (committed to git)
- `.env` - Local overrides (gitignored)
- `.env.local` - Vite-specific local config (gitignored)

## Development Best Practices

1. **Always Build Shared First:** Changes to `@todo-app/shared` require rebuild before web/api see them
2. **Run Type Checking:** Use `pnpm typecheck` before committing
3. **Test API with cURL/Postman:** `/health` endpoint should return 200 before frontend development
4. **Check Logs:** Fastify logs all requests with Pino structured logging
5. **Hot Module Reload:** Vite provides instant HMR, Fastify restarts on file changes (via tsx watch)
