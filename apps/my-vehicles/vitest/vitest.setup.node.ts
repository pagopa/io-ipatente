/**
 * MSW configuration for Vitest (used as setupFile in vitest.config.node.ts)
 */
import { afterAll, afterEach, beforeAll } from "vitest";
import { server } from "../mocks/server";

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));

//  Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
