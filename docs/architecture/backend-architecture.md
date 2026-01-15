# Backend Architecture

## Service Architecture

**Fastify Server Organization:**

```
packages/api/src/
├── routes/                 # API route handlers
│   ├── index.ts           # Route registration
│   ├── tasks.ts           # /api/tasks endpoints
│   └── health.ts          # /health endpoint
├── services/              # Business logic layer
│   └── taskService.ts     # Task operations
├── db/                    # Database layer
│   ├── client.ts          # Drizzle instance
│   ├── schema.ts          # Schema definitions
│   ├── queries.ts         # Reusable queries
│   └── migrations/        # Generated migrations
├── middleware/            # Fastify middleware
│   ├── errorHandler.ts    # Global error handling
│   └── cors.ts            # CORS configuration (future)
├── plugins/               # Fastify plugins
│   ├── static.ts          # Serve frontend build
│   └── rateLimit.ts       # Rate limiting config
├── server.ts              # Fastify app setup
└── index.ts               # Entry point
```

## Fastify Server Setup

```typescript
// packages/api/src/server.ts
import Fastify from 'fastify';
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod';
import fastifyStatic from '@fastify/static';
import fastifyRateLimit from '@fastify/rate-limit';
import { join } from 'path';
import { tasksRoutes } from './routes/tasks';
import { healthRoutes } from './routes/health';
import { errorHandler } from './middleware/errorHandler';
import { initializeDatabase } from './db/client';

export async function buildServer() {
  const server = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
  }).withTypeProvider<ZodTypeProvider>();

  // Set Zod as validator and serializer
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  // Register rate limiting
  await server.register(fastifyRateLimit, {
    max: 100, // 100 requests
    timeWindow: '1 minute',
  });

  // Register API routes
  await server.register(async (app) => {
    await app.register(healthRoutes);
    await app.register(tasksRoutes, { prefix: '/api' });
  });

  // Serve frontend static files (after API routes)
  const frontendPath = join(__dirname, '../../web/dist');
  await server.register(fastifyStatic, {
    root: frontendPath,
    prefix: '/',
  });

  // SPA fallback - serve index.html for all non-API routes
  server.setNotFoundHandler((request, reply) => {
    if (request.url.startsWith('/api')) {
      reply.code(404).send({ error: 'Not found' });
    } else {
      reply.sendFile('index.html');
    }
  });

  // Global error handler
  server.setErrorHandler(errorHandler);

  // Initialize database on startup
  await initializeDatabase();

  return server;
}
```

## Route Handler Example with Zod

```typescript
// packages/api/src/routes/tasks.ts
import type { FastifyPluginAsync } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import { CreateTaskInputSchema, UpdateTaskInputSchema, TaskSchema } from '@todo-app/shared/schemas/task.schema';
import * as taskService from '../services/taskService';

export const tasksRoutes: FastifyPluginAsync = async (fastify) => {
  const server = fastify.withTypeProvider<ZodTypeProvider>();

  // POST /api/tasks - Create task with Zod validation
  server.post('/tasks', {
    schema: {
      body: CreateTaskInputSchema,
      response: {
        201: z.object({
          task: TaskSchema,
        }),
      },
    },
  }, async (request, reply) => {
    const { text } = request.body; // TypeScript knows text is validated string
    const task = await taskService.createTask(text);
    return reply.code(201).send({ task });
  });

  // Additional routes: GET, PUT, PATCH, DELETE...
};
```

**Backend Architecture Patterns:**

- **Thin Controllers:** Route handlers delegate to service layer, no business logic in routes
- **Service Layer:** All business logic in `taskService.ts`, routes are just HTTP adapters
- **Type-Safe Validation:** Zod schemas validate at runtime, TypeScript enforces at compile time
- **Structured Logging:** Pino logger provides JSON logs for Fly.io aggregation
- **Graceful Errors:** Custom error handler maps application errors to appropriate HTTP codes
- **Transaction Support:** Batch operations use Drizzle transactions for atomicity
- **Health Monitoring:** `/health` endpoint validates database connectivity for Fly.io
