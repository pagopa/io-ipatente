import { CoreLogger } from "@io-ipatente/core";
import { AxiosError } from "axios";

import { getExternalApiClient } from "./client";

export const retrieveLicences =
  (logger: CoreLogger) =>
  async (additionalDataJWS: string, token: string, fiscalCode: string) => {
    // TEST: Simula errore DG_MOT
    if (process.env.FORCE_DG_MOT_ERROR === "true") {
      logger.error("[TEST] Forcing DG_MOT error");
      const mockError = new AxiosError(
        "DG_MOT service unavailable (test mode)",
        "ERR_BAD_REQUEST",
        undefined,
        undefined,
        {
          config: { headers: {} } as never,
          data: { error: "Service temporarily unavailable" },
          headers: {},
          status: 503,
          statusText: "Service Unavailable",
        },
      );
      throw mockError;
    }

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

      throw error;
    }
  };
