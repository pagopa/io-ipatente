import { DgMotError } from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";

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
    if (error instanceof ZodiosError) {
      throw new DgMotError("Failed zod validation of payments", error);
    }

    throw new DgMotError("Failed to retrieve payments", error);
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
    if (error instanceof ZodiosError) {
      throw new DgMotError("Failed zod validation of payment receipt", error);
    }

    throw new DgMotError("Failed to retrieve payment receipt", error);
  }
};
