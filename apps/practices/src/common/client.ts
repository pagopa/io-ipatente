import { getConfiguration, getKeepAliveAxiosConfig } from "@io-ipatente/core";
import { ApiOf } from "@zodios/core";

import { createApiClient } from "@/generated/bff-openapi";

const { BFF_API_BASE_PATH, BFF_API_BASE_URL } = getConfiguration();

export const client = createApiClient(
  `${BFF_API_BASE_URL}${BFF_API_BASE_PATH}`,
  getKeepAliveAxiosConfig(),
);
export type Api = ApiOf<typeof client>;
