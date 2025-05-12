import { auth } from "../../../../lib/auth"; // Path to your auth instance configuration
import { toNextJsHandler } from "better-auth/next-js"; // Correct import path and function

// Export the handlers by passing your auth instance to the helper
export const { POST, GET } = toNextJsHandler(auth); 