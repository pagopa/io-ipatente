import { AxiosRequestConfig } from "axios";
import * as http from "http";
import * as https from "https";

import { getConfiguration } from "../config";

export const getKeepAliveAxiosConfig = (): {
  axiosConfig: AxiosRequestConfig;
} => {
  const {
    FETCH_KEEPALIVE_MAX_FREE_SOCKETS,
    FETCH_KEEPALIVE_MAX_SOCKETS,
    FETCH_KEEPALIVE_TIMEOUT,
  } = getConfiguration();
  return {
    axiosConfig: {
      httpAgent: new http.Agent({
        keepAlive: true,
        maxFreeSockets: FETCH_KEEPALIVE_MAX_FREE_SOCKETS,
        maxSockets: FETCH_KEEPALIVE_MAX_SOCKETS,
      }),
      httpsAgent: new https.Agent({
        keepAlive: true,
        maxFreeSockets: FETCH_KEEPALIVE_MAX_FREE_SOCKETS,
        maxSockets: FETCH_KEEPALIVE_MAX_SOCKETS,
      }),
      maxBodyLength: Infinity,
      maxContentLength: Infinity,
      timeout: FETCH_KEEPALIVE_TIMEOUT,
    },
  };
};
