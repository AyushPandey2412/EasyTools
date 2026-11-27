import type { FastifyPluginAsync } from "fastify";
import { TestController } from "../../../../features/test/test.controller.js";

export const testRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get("/", TestController.list);
  fastify.get("/:id", TestController.getById);
  fastify.post("/", TestController.create);
  fastify.put("/:id", TestController.update);
  fastify.delete("/:id", TestController.delete);
};

export default testRoutes;
