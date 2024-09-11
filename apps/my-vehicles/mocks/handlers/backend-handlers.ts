import { getConfiguration } from "@/config";
import { faker } from "@faker-js/faker/locale/it";
import { HttpResponse, http } from "msw";

import {
  aMockBadRequestError,
  aMockForbiddenError,
  aMockNotAuthorizedError,
  aMockNotFoundError,
  getMockVehicle,
} from "../data/backend-data";

faker.seed(1);

export const buildHandlers = () => {
  const configuration = getConfiguration();
  const baseURL =
    configuration.BACKEND_API_BASE_URL + configuration.BACKEND_API_BASE_PATH;

  return [
    http.get(`${baseURL}/info-veicoli`, () => {
      const resultArray = [
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        HttpResponse.json(getInfoVeicoli200Response(), { status: 200 }),
        HttpResponse.json(getInfoVeicoli400Response(), { status: 400 }),
        HttpResponse.json(getInfoVeicoli401Response(), { status: 401 }),
        HttpResponse.json(getInfoVeicoli403Response(), { status: 403 }),
        HttpResponse.json(getInfoVeicoli404Response(), { status: 404 }),
        HttpResponse.json(getInfoVeicoli500Response(), { status: 500 }),
      ];
      return resultArray[0];
    }),
  ];
};

export const getInfoVeicoli200Response = () => getMockVehicle();
export const getInfoVeicoli400Response = () => aMockBadRequestError;
export const getInfoVeicoli401Response = () => aMockNotAuthorizedError;
export const getInfoVeicoli403Response = () => aMockForbiddenError;
export const getInfoVeicoli404Response = () => aMockNotFoundError;
export const getInfoVeicoli500Response = () => null;
