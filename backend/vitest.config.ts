import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    env: {
      NODE_ENV: "test",
      PORT: "4001",
      HOST: "127.0.0.1",
      DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/easy_tools",
      JWT_SECRET: "test_jwt_secret_with_minimum_length_of_32_characters",
      COOKIE_SECRET: "test_cookie_secret_with_minimum_length_of_32_characters",
      CORS_ORIGIN: "http://localhost:3000",
    },
  },
});
