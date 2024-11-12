import { AzureMonitorTraceExporter } from "@azure/monitor-opentelemetry-exporter";
import { registerOTel } from "@vercel/otel";

export async function register() {
  registerOTel({
    serviceName: "io-p-itn-ipatente-vehicles-app-01",
    traceExporter: new AzureMonitorTraceExporter({
      connectionString: process.env["AI_SDK_CONNECTION_STRING"],
    }),
  });
}
