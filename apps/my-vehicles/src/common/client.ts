import { getConfiguration } from "@/config";
import { createApiClient } from "@/generated/openapi";
import { ApiOf } from "@zodios/core";

const { BACKEND_API_BASE_PATH, BACKEND_API_BASE_URL } = getConfiguration();

export const client = createApiClient(
  `${BACKEND_API_BASE_URL}${BACKEND_API_BASE_PATH}`,
);
export type Api = ApiOf<typeof client>;
