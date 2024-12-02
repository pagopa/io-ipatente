import { auth } from "@/auth";
import { EsitoStampaTelematica } from "@/generated/bff-openapi";
import { retrievePaymentReceipt } from "@/lib/bff/business";
import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
  withJWTAuthAndVoucherHandler,
} from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

/**
 * @description Retrieve the payment's receipt
 */
export const GET = auth(
  withJWTAuthAndVoucherHandler(
    async (_request: Request, { additionalDataJWS, voucher }) => {
      try {
        const res = await retrievePaymentReceipt(
          additionalDataJWS,
          voucher.access_token,
          "", // TODO -> add real token
        );

        const payments = EsitoStampaTelematica.safeParse(res);

        if (payments.success) {
          return NextResponse.json(payments.data);
        }

        if (res instanceof AxiosError) {
          return NextResponse.json(
            { detail: res.message, status: res.status },
            { status: res.status },
          );
        }

        if (res instanceof ZodiosError) {
          return handleBadRequestErrorResponse(res.message);
        }

        return handleInternalErrorResponse("PaymentReceiptError", res);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `An Error has occurred while retrieving a payment receipt, caused by: `,
          error,
        );
        return handleInternalErrorResponse("PaymentReceiptError", error);
      }
    },
  ),
);
