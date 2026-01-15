import Fastify from 'fastify';
import fastifyRateLimit from '@fastify/rate-limit';
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod';
import type { Task } from '@todo-app/shared';
import { initializeDatabase } from './db/client';
import { tasksRoutes } from './routes/tasks';
import { errorHandler } from './middleware/errorHandler';

export async function buildServer() {
  const server = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
  }).withTypeProvider<ZodTypeProvider>();

  // Set Zod as validator and serializer
  server.setValidatorCompiler(validatorCompiler);
  server.setSerializerCompiler(serializerCompiler);

  // Initialize database and run migrations
  initializeDatabase();

  // Register rate limiting
  await server.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
  });

  // Register API routes
  await server.register(tasksRoutes, { prefix: '/api' });

  // Global error handler
  server.setErrorHandler(errorHandler);

  // Health check route
  server.get('/health', async () => {
    return { status: 'ok' };
  });

  // Test route to verify shared types work
  server.get('/test', async () => {
    const testTask: Task = {
      id: 1,
      text: 'Test task from API',
      createdAt: new Date(),
      archivedAt: null,
      sortOrder: 0,
    };
    return { message: 'Shared types working', task: testTask };
  });

  return server;
}
