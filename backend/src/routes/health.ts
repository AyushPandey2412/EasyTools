import type { FastifyPluginAsync } from "fastify";
import { authenticateDatabase } from "../db/sequelize.js";

export const healthRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/health", async () => {
    return {
      status: "ok",
      uptime: process.uptime(),
    };
  });

  fastify.get("/health/db", async (_request, reply) => {
    try {
      await authenticateDatabase();
      return {
        status: "ok",
        database: "connected",
      };
    } catch (err) {
      fastify.log.error(err, "Database health check failed");
      return reply.status(503).send({
        status: "error",
        database: "disconnected",
        message: err instanceof Error ? err.message : "Database connection failed",
      });
    }
  });
};
