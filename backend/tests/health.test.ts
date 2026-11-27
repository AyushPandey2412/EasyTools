import { describe, it, expect, beforeAll, afterAll } from "vitest";
import type { FastifyInstance } from "fastify";

describe("GET /health", () => {
  let app: FastifyInstance;

  beforeAll(async () => {
    const { buildApp } = await import("../src/app.js");
    app = await buildApp();
    await app.ready();
  });

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  it("should return status 200 and health payload", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    const payload = JSON.parse(response.payload);
    expect(payload.status).toBe("ok");
    expect(typeof payload.uptime).toBe("number");
  });

  it("should return status 200 from features/test controller and service", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/test",
    });

    expect(response.statusCode).toBe(200);
    const payload = JSON.parse(response.payload);
    expect(payload.success).toBe(true);
    expect(payload.feature).toBe("test");
    expect(payload.message).toBe("Test service executed successfully");
  });

  it("should return standard response from /api/v1/test REST routes", async () => {
    // 1. List
    const listResponse = await app.inject({
      method: "GET",
      url: "/api/v1/test",
    });
    expect(listResponse.statusCode).toBe(200);
    const listPayload = JSON.parse(listResponse.payload);
    expect(listPayload.success).toBe(true);
    expect(Array.isArray(listPayload.data)).toBe(true);

    // 2. Create
    const createResponse = await app.inject({
      method: "POST",
      url: "/api/v1/test",
      payload: { name: "New Feature Test" },
    });
    expect(createResponse.statusCode).toBe(201);
    const createPayload = JSON.parse(createResponse.payload);
    expect(createPayload.success).toBe(true);
    expect(createPayload.data.name).toBe("New Feature Test");
    const createdId = createPayload.data.id;

    // 3. GetById
    const getResponse = await app.inject({
      method: "GET",
      url: `/api/v1/test/${createdId}`,
    });
    expect(getResponse.statusCode).toBe(200);
    const getPayload = JSON.parse(getResponse.payload);
    expect(getPayload.success).toBe(true);
    expect(getPayload.data.id).toBe(createdId);

    // 4. Update
    const updateResponse = await app.inject({
      method: "PUT",
      url: `/api/v1/test/${createdId}`,
      payload: { name: "Updated Feature Test" },
    });
    expect(updateResponse.statusCode).toBe(200);
    const updatePayload = JSON.parse(updateResponse.payload);
    expect(updatePayload.success).toBe(true);
    expect(updatePayload.data.name).toBe("Updated Feature Test");

    // 5. Delete
    const deleteResponse = await app.inject({
      method: "DELETE",
      url: `/api/v1/test/${createdId}`,
    });
    expect(deleteResponse.statusCode).toBe(200);
    const deletePayload = JSON.parse(deleteResponse.payload);
    expect(deletePayload.success).toBe(true);
    expect(deletePayload.data.deleted).toBe(true);
  });
});
