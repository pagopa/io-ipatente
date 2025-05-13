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
    // eslint-disable-next-line no-console
    console.error(
      `An Error has occurred while retrieving practices, caused by: ${error}`,
    );
    return error;
  }
};
