import { getConfiguration } from "@io-ipatente/core";
import { HttpResponse, http } from "msw";

import { mockVoucher } from "../data/interop-data";

export const buildHandlers = () => [
  http.post(
    getConfiguration().INTEROP_AUTH_SERVER_ENDPOINT_URL,
    async ({ request }) => {
      const resultArray = [
        HttpResponse.json(getVoucher200Response(), { status: 200 }),
        HttpResponse.json({ description: `Bad request` }, { status: 400 }),
        HttpResponse.json({ description: `Unauthorized` }, { status: 401 }),
        HttpResponse.json({ description: `Forbidden` }, { status: 403 }),
        HttpResponse.json(
          {
            description: `Internal server error`,
          },
          { status: 500 },
        ),
      ];
      if (
        request.headers.get("Content-Type") ===
        "application/x-www-form-urlencoded"
      ) {
        const requestBody = await request.text();
        const params = new URLSearchParams(requestBody);

        // Some x-www-form-urlencoded keys check
        if (
          params.get("client_assertion") &&
          params.get("client_assertion_type") ===
            "urn:ietf:params:oauth:client-assertion-type:jwt-bearer" &&
          params.get("client_id") &&
          params.get("grant_type") === "client_credentials"
        ) {
          return resultArray[0];
        }
        return resultArray[3];
      }
      return resultArray[1];
    },
  ),
];

export const getVoucher200Response = () => mockVoucher;
