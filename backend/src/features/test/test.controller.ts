import type { FastifyReply, FastifyRequest } from "fastify";
import { TestService } from "./test.service.js";

export class TestController {
  static async list(request: FastifyRequest, reply: FastifyReply) {
    try {
      request.log.info("TestController.list invoked");
      const data = await TestService.list(request.query as Record<string, unknown>);
      return reply.status(200).send({
        success: true,
        data,
        message: "Fetched list successfully",
      });
    } catch (err) {
      request.log.error(err, "Error in TestController.list");
      return reply.status(500).send({
        success: false,
        message: err instanceof Error ? err.message : "Internal server error",
      });
    }
  }

  static async getById(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      request.log.info(`TestController.getById invoked with id: ${id}`);
      const data = await TestService.getById(id);

      if (!data) {
        return reply.status(404).send({
          success: false,
          message: `Record with id ${id} not found`,
        });
      }

      return reply.status(200).send({
        success: true,
        data,
        message: "Fetched record successfully",
      });
    } catch (err) {
      request.log.error(err, "Error in TestController.getById");
      return reply.status(500).send({
        success: false,
        message: err instanceof Error ? err.message : "Internal server error",
      });
    }
  }

  static async create(request: FastifyRequest<{ Body: { name: string } }>, reply: FastifyReply) {
    try {
      request.log.info("TestController.create invoked");
      const payload = request.body || { name: "" };
      const data = await TestService.create(payload);
      return reply.status(201).send({
        success: true,
        data,
        message: "Created record successfully",
      });
    } catch (err) {
      request.log.error(err, "Error in TestController.create");
      return reply.status(500).send({
        success: false,
        message: err instanceof Error ? err.message : "Internal server error",
      });
    }
  }

  static async update(
    request: FastifyRequest<{ Params: { id: string }; Body: { name: string } }>,
    reply: FastifyReply
  ) {
    try {
      const { id } = request.params;
      request.log.info(`TestController.update invoked with id: ${id}`);
      const data = await TestService.update(id, request.body);

      if (!data) {
        return reply.status(404).send({
          success: false,
          message: `Record with id ${id} not found`,
        });
      }

      return reply.status(200).send({
        success: true,
        data,
        message: "Updated record successfully",
      });
    } catch (err) {
      request.log.error(err, "Error in TestController.update");
      return reply.status(500).send({
        success: false,
        message: err instanceof Error ? err.message : "Internal server error",
      });
    }
  }

  static async delete(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    try {
      const { id } = request.params;
      request.log.info(`TestController.delete invoked with id: ${id}`);
      const deleted = await TestService.delete(id);

      if (!deleted) {
        return reply.status(404).send({
          success: false,
          message: `Record with id ${id} not found`,
        });
      }

      return reply.status(200).send({
        success: true,
        data: { id, deleted: true },
        message: "Deleted record successfully",
      });
    } catch (err) {
      request.log.error(err, "Error in TestController.delete");
      return reply.status(500).send({
        success: false,
        message: err instanceof Error ? err.message : "Internal server error",
      });
    }
  }

  // Backward compatibility method for /test endpoint
  static async getTest(request: FastifyRequest, reply: FastifyReply) {
    request.log.info("TestController.getTest invoked");
    const result = TestService.getTestData();
    return reply.status(200).send(result);
  }
}

// Backward compatibility export
export const testController = TestController;
