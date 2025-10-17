import { logger } from "@io-ipatente/logger";

export async function register() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_RUNTIME === "nodejs"
  ) {
    // Dynamically import the tracing module only if the code is running server-side on Node.js
    const { initAzureMonitor } = await import(
      "@pagopa/azure-tracing/azure-monitor"
    );

    initAzureMonitor();

    logger.info(
      "Azure Monitor OpenTelemetry has been initialized on the server.",
    );
  } else {
    logger.info("Tracking code skipped on client.");
  }
}
