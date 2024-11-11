import { NextResponse } from "next/server";

import { getConfiguration } from "../config";
import { generateClientAssertion } from "../interop/client-assertion";
import { Voucher, requestVoucher } from "../interop/voucher";
import {
  handleInternalErrorResponse,
  handleUnauthorizedErrorResponse,
} from "../utils/errors";

const {
  INTEROP_AUTH_SERVER_ENDPOINT_URL,
  INTEROP_CLIENT_ASSERTION_AUD,
  INTEROP_CLIENT_ASSERTION_ISS,
  INTEROP_CLIENT_ASSERTION_KID,
  INTEROP_CLIENT_ASSERTION_PK,
  INTEROP_CLIENT_ASSERTION_PURPOSE_ID,
  INTEROP_CLIENT_ASSERTION_SUB,
  INTEROP_CLIENT_ASSERTION_TYPE,
  INTEROP_CLIENT_ID,
  INTEROP_ESERVICE_AUDIENCE,
  INTEROP_GRANT_TYPE,
} = getConfiguration();

export const withVoucherHandler =
  (
    handler: (
      request: Request,
      context: {
        additionalDataJWS: string;
        voucher: Voucher;
      },
    ) => Promise<NextResponse> | Promise<Response>,
    fiscalCode: string,
  ) =>
  async (request: Request) => {
    try {
      const clientAssertionResult = generateClientAssertion({
        additionalData: {
          LoA: "high",
          aud: INTEROP_ESERVICE_AUDIENCE,
          userID: fiscalCode,
          userLocation: "office", // TODO: to understand what and how to specify
        },
        alg: "RS256",
        aud: INTEROP_CLIENT_ASSERTION_AUD,
        exp: 600,
        iss: INTEROP_CLIENT_ASSERTION_ISS,
        kid: INTEROP_CLIENT_ASSERTION_KID,
        privateKey: INTEROP_CLIENT_ASSERTION_PK,
        purposeId: INTEROP_CLIENT_ASSERTION_PURPOSE_ID,
        sub: INTEROP_CLIENT_ASSERTION_SUB,
        typ: "JWT",
      });

      if (!clientAssertionResult) {
        return handleUnauthorizedErrorResponse("No client assertion provided");
      }

      const voucher = await requestVoucher({
        authServerEndpointUrl: INTEROP_AUTH_SERVER_ENDPOINT_URL,
        data: {
          client_assertion: clientAssertionResult.clientAssertionJWS,
          client_assertion_type: INTEROP_CLIENT_ASSERTION_TYPE,
          client_id: INTEROP_CLIENT_ID,
          grant_type: INTEROP_GRANT_TYPE,
        },
      });

      if (!voucher) {
        return handleUnauthorizedErrorResponse("No voucher provided");
      }

      return handler(request, {
        additionalDataJWS: clientAssertionResult.additionalDataJWS,
        voucher,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `An Error has occurred while requesting voucher, caused by: `,
        error,
      );
      return handleInternalErrorResponse("VoucherRequestError", error);
    }
  };
