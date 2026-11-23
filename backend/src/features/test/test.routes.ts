import type { FastifyPluginAsync } from "fastify";
import { testController } from "./test.controller.js";

export const testRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/test", (request, reply) => testController.getTest(request, reply));
};
