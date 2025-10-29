import "dotenv/config";

import z from "zod";

function parseEnv(env: NodeJS.ProcessEnv) {
  const envSchema = z.object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    PORT: z.coerce.number().default(3000),
    DATABASE_URL: z.url(),
    BASE_URL: z.string().default("http://localhost:3000"),
  });

  const { data, success, error } = envSchema.safeParse(env);

  if (!success) {
    throw error;
  }

  if (data.NODE_ENV !== "development") {
    if (!env.DATABASE_URL || !env.PORT || !env.BASE_URL) {
      throw new Error("Some environment Variables are missing");
    }
  }

  return data;
}

export const env = parseEnv(process.env);
