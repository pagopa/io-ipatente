import { createApiClient } from "@/generated/ext-openapi";
import { getConfiguration } from "@io-ipatente/core";
import { ApiOf, ZodiosInstance } from "@zodios/core";

const { EXT_API_BASE_PATH, EXT_API_BASE_URL, EXT_API_MOCKING } =
  getConfiguration();

const client = createApiClient(`${EXT_API_BASE_URL}${EXT_API_BASE_PATH}`);
export type ExtApi = ApiOf<typeof client>;

let externalApiClient: ZodiosInstance<ExtApi>;

export const getExternalApiClient = (): ZodiosInstance<ExtApi> =>
  externalApiClient ? externalApiClient : buildExternalApiClient();

const buildExternalApiClient = (): ZodiosInstance<ExtApi> => {
  if (EXT_API_MOCKING) {
    require("../../../mocks");
  }
  return client;
};
