import type { SpanExporter } from "@opentelemetry/sdk-trace-base";

import { registerOTel } from "@vercel/otel";

export async function register() {
  if (process.env.APP_ENV === "production") {
    let traceExporter: SpanExporter | undefined;

    if (process.env.NEXT_RUNTIME === "nodejs") {
      const { AzureMonitorTraceExporter } = await import(
        "@azure/monitor-opentelemetry-exporter"
      );
      traceExporter = new AzureMonitorTraceExporter({
        connectionString: process.env["AI_SDK_CONNECTION_STRING"],
        // you can read from ENV if you prefer to
        // connectionString: process.env.APP_INSIGHTS_CONNECTION_STRING,
      });
    }

    registerOTel({
      serviceName: "io-p-itn-ipatente-vehicles-app-01",
      traceExporter,
    });
  }
}
