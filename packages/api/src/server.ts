import Fastify from 'fastify';
import type { Task } from '@todo-app/shared';

export async function buildServer() {
  const server = Fastify({
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
  });

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
