import { AxiosErrorEnriched, CoreLogger, ErrorSource } from "@io-ipatente/core";
import { AxiosError } from "axios";

import { getExternalApiClient } from "./client";

export const retrieveLicences =
  (logger: CoreLogger) =>
  async (additionalDataJWS: string, token: string, fiscalCode: string) => {
    try {
      return await getExternalApiClient().getPuntiPatente({
        headers: {
          "Agid-JWT-TrackingEvidence": additionalDataJWS,
          Authorization: `Bearer ${token}`,
          codiceFiscale: fiscalCode,
        },
      });
    } catch (error) {
      logger.error(
        `An Error has occurred while retrieving licences, caused by: ${error}`,
      );
      if (error instanceof AxiosError) {
        return new AxiosErrorEnriched(error, ErrorSource.DG_MOT);
      }
      return error;
    }
  };
