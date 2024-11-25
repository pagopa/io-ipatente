import { faker } from "@faker-js/faker/locale/it";
import { getConfiguration } from "@io-ipatente/core";
import { HttpResponse, http } from "msw";

import { getMockPractices } from "../data/backend-data";

faker.seed();

export const buildHandlers = () => {
  const configuration = getConfiguration();
  const baseURL =
    configuration.EXT_API_BASE_URL + configuration.EXT_API_BASE_PATH;

  return [
    http.get(`${baseURL}/inte/pratiche`, ({ request }) => {
      const resultArray = [
        HttpResponse.json(getPratiche200Response(), { status: 200 }),
        HttpResponse.json({ description: `Bad request` }, { status: 400 }),
        HttpResponse.json({ description: `Unauthorized` }, { status: 401 }),
        HttpResponse.json({ description: `Forbidden` }, { status: 403 }),
        HttpResponse.json({ description: `Not found` }, { status: 404 }),
        HttpResponse.json(
          {
            description: `Internal server error`,
          },
          { status: 500 },
        ),
      ];
      // Simple check of JWT Bearer token and fiscalCode precence
      if (
        request.headers.get("authorization") &&
        request.headers.get("codiceFiscale")
      ) {
        return resultArray[0];
      }
      return resultArray[3];
    }),
  ];
};

export const getPratiche200Response = () => getMockPractices();
