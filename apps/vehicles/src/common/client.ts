import { getConfiguration } from "@/config";
import { createApiClient } from "@/generated/bff-openapi";
import { ApiOf } from "@zodios/core";

const { BFF_API_BASE_PATH, BFF_API_BASE_URL } = getConfiguration();

export const client = createApiClient(
  `${BFF_API_BASE_URL}${BFF_API_BASE_PATH}`,
);
export type Api = ApiOf<typeof client>;
