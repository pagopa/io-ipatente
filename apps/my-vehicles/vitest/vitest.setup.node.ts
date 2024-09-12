/**
 * MSW configuration for Vitest (used as setupFile in vitest.config.node.ts)
 */
import { loadEnvConfig } from "@next/env";
import { afterAll, afterEach, beforeAll } from "vitest";

import { mswServerTest } from "../mocks/msw-server";

let mswServer: ReturnType<typeof mswServerTest>;
// Start server before all tests
beforeAll(() => {
  loadEnvConfig(process.cwd());
  // this done to correctly load the environment variables on msw handlers
  mswServer = mswServerTest();
  mswServer.listen({ onUnhandledRequest: "warn" });
});

//  Close server after all tests
afterAll(() => mswServer.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => mswServer.resetHandlers());
