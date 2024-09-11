import { getConfiguration } from "@/config";

/**
 * MSW Setup
 *
 * Depending on the execution context, either start a local service worker _(browser context)_
 * or a NodeJS request interceptor _(done via a designated node-request-interceptor library)_.
 */
export const setupMocks = async () => {
  if (
    getConfiguration().IS_MSW_ENABLED ||
    process.env.NEXT_PUBLIC_IS_MSW_ENABLED
  ) {
    if (getConfiguration().IS_BROWSER) {
      const { mswWorker } = await import("./msw-worker");
      mswWorker.start({ onUnhandledRequest: "bypass" });
    } else {
      const { mswServer } = await import("./msw-server");
      mswServer.listen({ onUnhandledRequest: "warn" });
    }
  }
};
