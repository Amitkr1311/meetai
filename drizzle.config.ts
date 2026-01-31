import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
// import { DATABASE_URL } from './src/lib/config';
const requireEnv = (key: string) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

const DATABASE_URL = requireEnv("DATABASE_URL");

export default defineConfig({
  out: './drizzle',
  schema: './src/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: DATABASE_URL,
  },
});
