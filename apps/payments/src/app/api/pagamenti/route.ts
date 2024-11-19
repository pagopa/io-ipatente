import { auth } from "@/auth";
import { Pagamento } from "@/generated/bff-openapi";
import { retrievePayments } from "@/lib/bff/business";
import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
  withJWTAuthAndVoucherHandler,
} from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * @description Retrieve user payments
 */
export const GET = auth(
  withJWTAuthAndVoucherHandler(
    async (_request: Request, { additionalDataJWS, user, voucher }) => {
      try {
        const res = await retrievePayments(
          additionalDataJWS,
          voucher.access_token,
          user.fiscalCode,
        );

        const payments = z.array(Pagamento).safeParse(res);

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

        return handleInternalErrorResponse("PaymentsRetrieveError", res);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `An Error has occurred while retrieving user payments, caused by: `,
          error,
        );
        return handleInternalErrorResponse("PaymentsRetrieveError", error);
      }
    },
  ),
);
