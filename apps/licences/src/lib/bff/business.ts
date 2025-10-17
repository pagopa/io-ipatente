import { logger } from "@io-ipatente/logger";

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
    logger.error(
      `An Error has occurred while retrieving licences, caused by: ${error}`,
    );
    return error;
  }
};
