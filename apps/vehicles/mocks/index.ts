import { getConfiguration } from "@/config";

/**
 * MSW Setup
 *
 * Depending on the execution context, either start a local service worker _(browser context)_
 * or a NodeJS request interceptor _(done via a designated node-request-interceptor library)_.
 */
export const setupMocks = async () => {
  if (
    !getConfiguration().IS_MSW_ENABLED ||
    !process.env.NEXT_PUBLIC_IS_MSW_ENABLED
  ) {
    return;
  }

  if (getConfiguration().IS_BROWSER) {
    const { worker } = await import("./browser");
    return worker.start({ onUnhandledRequest: "bypass" });
  }

  const { server } = await import("./server");
  return server.listen({ onUnhandledRequest: "warn" });
};

setupMocks();
