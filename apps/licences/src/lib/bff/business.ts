import { getExternalApiClient } from "./client";

export const retrieveLicences = async (
  additionalDataJWS: string,
  token: string,
  fiscalCode: string,
) => {
  const startTime = new Date().getTime();
  try {
    return await getExternalApiClient().getPuntiPatente({
      headers: {
        "Agid-JWT-TrackingEvidence": additionalDataJWS,
        Authorization: `Bearer ${token}`,
        codiceFiscale: fiscalCode,
      },
    });
  } catch (error) {
    const endTime = new Date().getTime();
    // eslint-disable-next-line no-console
    console.error(
      `An Error has occurred while retrieving licences, caused by: ${error} , [catch] getPuntiPatente duration: ${
        endTime - startTime
      }`,
    );
    return error;
  }
};
