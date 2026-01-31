function throwConfigException(key: string): never {
  throw new Error(`Missing required environment variable: ${key}`);
}

export const DATABASE_URL =
  process.env.DATABASE_URL ?? throwConfigException("DATABASE_URL");

export const BETTER_AUTH_SECRET =
  process.env.BETTER_AUTH_SECRET ?? throwConfigException("BETTER_AUTH_SECRET");

export const BETTER_AUTH_URL =
  process.env.BETTER_AUTH_URL ?? throwConfigException("BETTER_AUTH_URL");

export const GITHUB_CLIENT_ID =
  process.env.GITHUB_CLIENT_ID ?? throwConfigException("GITHUB_CLIENT_ID");

export const GITHUB_CLIENT_SECRET =
  process.env.GITHUB_CLIENT_SECRET ?? throwConfigException("GITHUB_CLIENT_SECRET");

export const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ?? throwConfigException("GOOGLE_CLIENT_ID");

export const GOOGLE_CLIENT_SECRET =
  process.env.GOOGLE_CLIENT_SECRET ?? throwConfigException("GOOGLE_CLIENT_SECRET");
