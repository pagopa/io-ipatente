import { faker } from "@faker-js/faker/locale/it";
import { getConfiguration } from "@io-ipatente/core";
import { HttpResponse, http } from "msw";

import { getMockPractices } from "../data/backend-data";

faker.seed();

export const buildHandlers = () => {
  const configuration = getConfiguration();
  const baseURL =
    configuration.BFF_API_BASE_URL + configuration.BFF_API_BASE_PATH;

  return [
    http.get(`${baseURL}/pratiche`, () => {
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
      return resultArray[0];
    }),
  ];
};

export const getPratiche200Response = () => getMockPractices();
