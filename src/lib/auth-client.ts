import { createAuthClient } from "better-auth/react";

// NOTE: If you add client-side plugins (like twoFactorClient),
// you would configure them here within the plugins array.
// See: https://www.better-auth.com/docs/basic-usage#client-configuration

export const authClient = createAuthClient({
  // Example client plugin configuration:
  // plugins: [
  //   twoFactorClient({
  //     twoFactorPage: "/two-factor", // Page to redirect if 2FA needed
  //   }),
  // ],
});

// Ensure the lib directory exists if it doesn't
// You might need to manually create src/lib if it's not there. 