import { auth } from "@/auth";
import { EsitoStampaTelematica } from "@/generated/bff-openapi";
import { retrievePaymentReceipt } from "@/lib/bff/business";
import { logger } from "@/lib/bff/logger";
import {
  BffError,
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
  handlerErrorLog,
  withJWTAuthAndVoucherHandler,
} from "@io-ipatente/core";
import { NextResponse } from "next/server";

/**
 * @description Retrieve the payment's receipt
 */
export const GET = auth(
  withJWTAuthAndVoucherHandler(logger)(
    async (_request: Request, { additionalDataJWS, params, user, voucher }) => {
      try {
        if (
          !params?.idRichiestaPagamento ||
          typeof params.idRichiestaPagamento !== "string"
        ) {
          return handleBadRequestErrorResponse(
            "Missing idRichiestaPagamento param",
          );
        }

        const res = await retrievePaymentReceipt(
          additionalDataJWS,
          voucher.access_token,
          params.idRichiestaPagamento,
          user.fiscalCode,
        );

        const payments = EsitoStampaTelematica.safeParse(res);

        if (!payments.success) {
          throw new BffError(
            "Validation failed: Invalid payment receipt data from DG_MOT",
            payments.error,
          );
        }

        return NextResponse.json(payments.data);
      } catch (error) {
        handlerErrorLog(logger)(
          "An Error has occurred while retrieving a payment receipt",
          { error },
        );

        return handleInternalErrorResponse("PaymentReceiptError", error);
      }
    },
  ),
);
