import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

// Automatically load backend/.env using Node's built-in process.loadEnvFile
try {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const envPath = path.resolve(__dirname, "../../.env");
  process.loadEnvFile(envPath);
} catch {
  // Rely on existing process.env (e.g. in test suites, CI, or containers)
}

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.coerce.number().default(4000),
  HOST: z.string().default("127.0.0.1"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters long"),
  COOKIE_SECRET: z.string().min(32, "COOKIE_SECRET must be at least 32 characters long"),
  CORS_ORIGIN: z.string().min(1, "CORS_ORIGIN is required").default("http://localhost:3000"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Invalid environment variables:");
  const formattedErrors = parsed.error.format();
  for (const [key, val] of Object.entries(formattedErrors)) {
    if (key !== "_errors" && val && "_errors" in val) {
      console.error(`  - ${key}: ${(val as { _errors: string[] })._errors.join(", ")}`);
    }
  }
  process.exit(1);
}

export const env = parsed.data;
export type Env = typeof env;
