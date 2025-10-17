import { logger } from "@io-ipatente/logger";

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
    logger.error(
      `An Error has occurred while retrieving practices, caused by: ${error}`,
    );
    return error;
  }
};
