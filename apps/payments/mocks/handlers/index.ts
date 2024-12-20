import { getConfiguration } from "@io-ipatente/core";
import { HttpHandler } from "msw";

import { buildHandlers as bffHandlers } from "./bff-handlers";
import { buildHandlers as extHandlers } from "./ext-handlers";
import { buildHandlers as interopHandlers } from "./interop-handlers";

/** List of handlers managed by MSW */
export const getHandlers = () => {
  const config = getConfiguration();
  const handlers: HttpHandler[] = [];

  if (config.BFF_API_MOCKING) {
    handlers.push(...bffHandlers());
  }
  if (config.EXT_API_MOCKING) {
    handlers.push(...extHandlers());
  }
  if (config.INTEROP_API_MOCKING) {
    handlers.push(...interopHandlers());
  }
  return handlers;
};
