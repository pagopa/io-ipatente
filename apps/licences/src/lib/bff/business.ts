import { DgMotError } from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";

import { getExternalApiClient } from "./client";

export const retrieveLicences =
  () =>
  async (additionalDataJWS: string, token: string, fiscalCode: string) => {
    try {
      // TEST: Simula errore DG_MOT
      if (process.env.FORCE_DG_MOT_ERROR === "true") {
        throw new AxiosError("DG_MOT server error (test mode)");
      }

      return await getExternalApiClient().getPuntiPatente({
        headers: {
          "Agid-JWT-TrackingEvidence": additionalDataJWS,
          Authorization: `Bearer ${token}`,
          codiceFiscale: fiscalCode,
        },
      });
    } catch (error) {
      if (error instanceof ZodiosError) {
        throw new DgMotError("Failed zod validation", error);
      }

      throw new DgMotError("Failed to retrieve licences", error);
    }
  };
