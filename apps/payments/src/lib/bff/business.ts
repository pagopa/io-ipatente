import { getExternalApiClient } from "./client";

export const retrievePayments = async (
  additionalDataJWS: string,
  token: string,
  fiscalCode: string,
) => {
  try {
    return await getExternalApiClient().getPagamenti({
      headers: {
        "Agid-JWT-TrackingEvidence": additionalDataJWS,
        Authorization: `Bearer ${token}`,
        codiceFiscale: fiscalCode,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `An Error has occurred while retrieving payments, caused by: `,
      error,
    );
    return error;
  }
};

export const retrievePaymentReceipt = async (
  additionalDataJWS: string,
  token: string,
  paymentRequestId: string,
  fiscalCode: string,
) => {
  try {
    return await getExternalApiClient().stampaRicevutaTelematica({
      headers: {
        "Agid-JWT-TrackingEvidence": additionalDataJWS,
        Authorization: `Bearer ${token}`,
        codiceFiscale: fiscalCode,
      },
      params: {
        idRichiestaPagamento: paymentRequestId,
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `An Error has occurred while retrieving payment receipt, caused by: `,
      error,
    );
    return error;
  }
};
