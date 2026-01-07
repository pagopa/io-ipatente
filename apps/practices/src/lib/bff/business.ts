import { DgMotError } from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";

import { getExternalApiClient } from "./client";

export const retrievePractices = async (
  additionalDataJWS: string,
  token: string,
  fiscalCode: string,
) => {
  try {
    return await getExternalApiClient().getPratiche({
      headers: {
        "Agid-JWT-TrackingEvidence": additionalDataJWS,
        Authorization: `Bearer ${token}`,
        codiceFiscale: fiscalCode,
      },
    });
  } catch (error) {
    if (error instanceof ZodiosError) {
      throw new DgMotError("Failed zod validation of practices", error);
    }

    throw new DgMotError("Failed to retrieve practices", error);
  }
};
