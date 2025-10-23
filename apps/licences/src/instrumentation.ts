import { logger } from "@io-ipatente/logger";

export async function register() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_RUNTIME === "nodejs"
  ) {
    const [{ initAzureMonitor }, { PinoInstrumentation }] = await Promise.all([
      import("@pagopa/azure-tracing/azure-monitor"),
      import("@opentelemetry/instrumentation-pino"),
    ]);

    initAzureMonitor([new PinoInstrumentation()]);

    logger.info(
      "Azure Monitor OpenTelemetry has been initialized on the server.",
    );
  } else {
    logger.info("Tracking code skipped on client.");
  }
}
