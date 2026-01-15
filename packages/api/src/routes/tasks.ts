import { FastifyPluginAsync } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';
import {
  TaskSchema,
  CreateTaskInputSchema,
  UpdateTaskInputSchema,
} from '@todo-app/shared';
import { getActiveTasks, createTask, updateTaskText } from '../db/queries';

export const tasksRoutes: FastifyPluginAsync = async (fastify) => {
  const server = fastify.withTypeProvider<ZodTypeProvider>();

  // GET /tasks - Get all active tasks
  server.get(
    '/tasks',
    {
      schema: {
        response: {
          200: z.object({
            tasks: z.array(TaskSchema),
          }),
        },
      },
    },
    async (_request, reply) => {
      const tasks = await getActiveTasks();
      return reply.code(200).send({ tasks });
    }
  );

  // POST /tasks - Create new task
  server.post(
    '/tasks',
    {
      schema: {
        body: CreateTaskInputSchema,
        response: {
          201: z.object({
            task: TaskSchema,
          }),
        },
      },
    },
    async (request, reply) => {
      const { text } = request.body;
      const task = await createTask(text);
      return reply.code(201).send({ task });
    }
  );

  // PUT /tasks/:id - Update task text
  server.put(
    '/tasks/:id',
    {
      schema: {
        params: z.object({
          id: z.string().transform(Number),
        }),
        body: UpdateTaskInputSchema,
        response: {
          200: z.object({
            task: TaskSchema,
          }),
          404: z.object({
            error: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { id } = request.params;
      const { text } = request.body;

      try {
        const task = await updateTaskText(id, text);
        return reply.code(200).send({ task });
      } catch (error) {
        if (error instanceof Error && error.message.includes('not found')) {
          return reply.code(404).send({ error: error.message });
        }
        throw error;
      }
    }
  );
};
