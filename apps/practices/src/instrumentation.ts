import { initAzureMonitor } from "@pagopa/azure-tracing/azure-monitor";

export async function register() {
  initAzureMonitor();
}
