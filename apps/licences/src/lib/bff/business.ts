import { DgMotError } from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";

import { getExternalApiClient } from "./client";

export const retrieveLicences = async (
  additionalDataJWS: string,
  token: string,
  fiscalCode: string,
) => {
  try {
    return await getExternalApiClient().getPuntiPatente({
      headers: {
        "Agid-JWT-TrackingEvidence": additionalDataJWS,
        Authorization: `Bearer ${token}`,
        codiceFiscale: fiscalCode,
      },
    });
  } catch (error) {
    if (error instanceof ZodiosError) {
      throw new DgMotError("Failed zod validation of licences", error);
    }

    throw new DgMotError("Failed to retrieve licences", error);
  }
};
