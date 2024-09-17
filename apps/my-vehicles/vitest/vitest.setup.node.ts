/**
 * MSW configuration for Vitest (used as setupFile in vitest.config.node.ts)
 */
import { loadEnvConfig } from "@next/env";
import { afterAll, afterEach, beforeAll } from "vitest";

import { serverTest } from "../mocks/server";

let server: ReturnType<typeof serverTest>;
// Start server before all tests
beforeAll(() => {
  loadEnvConfig(process.cwd());
  // this done to correctly load the environment variables on msw handlers
  server = serverTest();
  server.listen({ onUnhandledRequest: "warn" });
});

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
