import { logger } from "@io-ipatente/logger";
import { DiagConsoleLogger, DiagLogLevel, diag } from "@opentelemetry/api";

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG);

export async function register() {
  if (
    process.env.NODE_ENV === "production" &&
    process.env.NEXT_RUNTIME === "nodejs"
  ) {
    // Dynamically import the tracing modules only if the code is running server-side on Node.js
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
