import { z } from 'zod';

export const configSchema = z.object({
  GITHUB_ID: z.string().nonempty(),
  GITHUB_SECRET: z.string().nonempty(),
  GOOGLE_ID: z.string().nonempty(),
  GOOGLE_SECRET: z.string().nonempty(),
  DATABASE_URL: z.string().nonempty(),
  OPENAI_API_KEY: z.string().nonempty(),
});

export const env = configSchema.parse(process.env);
