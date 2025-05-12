import { betterAuth } from "better-auth";

// TODO: Configure your database adapter
// Example using Prisma (install @better-auth/adapter-prisma):
// import { PrismaClient } from '@prisma/client';
// import { prismaAdapter } from 'better-auth/adapters/prisma';
// const prisma = new PrismaClient();

// Example using SQLite (install better-sqlite3):
// import Database from 'better-sqlite3';
// const db = new Database('./sqlite.db');

// Make sure to set BETTER_AUTH_SECRET and BETTER_AUTH_URL in your .env.local file

export const auth = betterAuth({
  // --- Database Configuration --- //
  // Required: Choose ONE database configuration method

  // Option 1: Prisma Adapter
  // database: prismaAdapter(prisma, { provider: "sqlite" /* or postgresql, mysql */ }),

  // Option 2: better-sqlite3 (Kysely built-in)
  // database: db,

  // Option 3: Other Kysely dialects (e.g., LibSQL/Turso)
  // database: { dialect: yourKyselyDialect, type: "sqlite" /* or pg, mysql */ },

  // --- Authentication Methods --- //
  // Enable email and password authentication
  emailAndPassword: {
    enabled: true,
    // autoSignIn: false, // Uncomment to disable auto sign-in after sign-up
    // emailVerificationRequired: true, // Uncomment to require email verification
  },

  // --- Social Providers (Optional) --- //
  // socialProviders: {
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID!,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET!,
  //   },
  //   google: {
  //      clientId: process.env.GOOGLE_CLIENT_ID!,
  //      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  //   }
  //   // Add other providers as needed
  // },

  // --- Plugins (Optional) --- //
  // plugins: [
  //   // Example: twoFactor()
  // ]

  // --- Advanced Configuration (Optional) --- //
  // advanced: {
  //   cookiePrefix: 'customPrefix',
  //   // ... other advanced options
  // },
});

// Type helper for session object (optional but recommended)
// export type Session = typeof auth.$Infer.Session; 