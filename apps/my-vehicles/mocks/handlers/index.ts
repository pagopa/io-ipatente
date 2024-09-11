import { getConfiguration } from "@/config";
import { HttpHandler } from "msw";

import { buildHandlers as backendHandlers } from "./backend-handlers";

/** List of handlers managed by MSW */
export const getHandlers = () => {
  const config = getConfiguration();
  const handlers: HttpHandler[] = [];

  if (config.BACKEND_API_MOCKING) {
    handlers.push(...backendHandlers());
  }
  return handlers;
};
