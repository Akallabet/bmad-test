import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  // Zod validation errors
  if (error.validation) {
    return reply.code(400).send({
      error: `Validation failed: ${error.message}`,
    });
  }

  // Application errors (e.g., "Task not found")
  if (error.message.includes('not found')) {
    return reply.code(404).send({
      error: error.message,
    });
  }

  // Internal server errors
  request.log.error(error);
  return reply.code(500).send({
    error: 'Internal server error',
  });
}
