import Fastify, { type FastifyInstance, type FastifyError } from "fastify";
import fastifyCookie from "@fastify/cookie";
import fastifyCors from "@fastify/cors";
import fastifyHelmet from "@fastify/helmet";
import fastifyRateLimit from "@fastify/rate-limit";
import { env } from "./config/env.js";
import { healthRoutes } from "./routes/health.js";
import { testRoutes } from "./features/test/test.routes.js";

export async function buildApp(): Promise<FastifyInstance> {
  const isDev = env.NODE_ENV === "development";

  const app = Fastify({
    logger: isDev
      ? {
          transport: {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "HH:MM:ss Z",
              ignore: "pid,hostname",
            },
          },
        }
      : true,
  });

  // Security headers
  await app.register(fastifyHelmet);

  // CORS configuration
  await app.register(fastifyCors, {
    origin: env.CORS_ORIGIN,
    credentials: true,
  });

  // Cookie plugin
  await app.register(fastifyCookie, {
    secret: env.COOKIE_SECRET,
  });

  // Generous global rate limiting (e.g. 100 requests per minute)
  await app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: "1 minute",
  });

  // Global error handler
  app.setErrorHandler((error: FastifyError | Error, request, reply) => {
    const statusCode = "statusCode" in error && typeof error.statusCode === "number"
      ? error.statusCode
      : 500;

    request.log.error(error);

    const response = {
      error: {
        statusCode,
        message:
          statusCode === 500 && env.NODE_ENV === "production"
            ? "Internal Server Error"
            : error.message || "An unexpected error occurred",
      },
    };

    reply.status(statusCode).send(response);
  });

  // Register routes
  await app.register(healthRoutes);
  await app.register(testRoutes);

  return app;
}
