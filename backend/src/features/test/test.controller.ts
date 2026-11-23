import type { FastifyReply, FastifyRequest } from "fastify";
import { testService } from "./test.service.js";

export class TestController {
  async getTest(request: FastifyRequest, reply: FastifyReply) {
    request.log.info("TestController.getTest invoked");
    const result = testService.getTestData();
    return reply.status(200).send(result);
  }
}

export const testController = new TestController();
