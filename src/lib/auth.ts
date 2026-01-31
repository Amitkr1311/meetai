import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema";
import { BETTER_AUTH_URL, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/lib/config";

export const auth = betterAuth({
  baseURL: BETTER_AUTH_URL,
    socialProviders: {
          github: { 
              clientId: GITHUB_CLIENT_ID, 
              clientSecret: GITHUB_CLIENT_SECRET, 
          },
          google: { 
            clientId: GOOGLE_CLIENT_ID, 
            clientSecret: GOOGLE_CLIENT_SECRET, 
        }, 
      },  
    emailAndPassword: { 
    enabled: true, 
  },
    database: drizzleAdapter(db, {
    provider: "pg",   
    schema:{
        ...schema
    } 
  }),
});
