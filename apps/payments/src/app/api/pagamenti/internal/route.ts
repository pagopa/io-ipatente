import { auth } from "@/auth";
import { Pagamento } from "@/generated/bff-openapi";
import { retrievePayments } from "@/lib/bff/business";
import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
  withTestUserAndVoucherInternalHandler,
} from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

/**
 * @description Retrieve user payments
 */
export const GET = auth(
  withTestUserAndVoucherInternalHandler(
    async (_request: Request, { additionalDataJWS, testUser, voucher }) => {
      try {
        const res = await retrievePayments(
          additionalDataJWS,
          voucher.access_token,
          testUser,
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

        return handleInternalErrorResponse(
          "PaymentsInternalRetrieveError",
          res,
        );
      } catch (error) {
        console.error(
          `An Error has occurred while retrieving user payments, caused by: `,
          error,
        );
        return handleInternalErrorResponse(
          "PaymentsInternalRetrieveError",
          error,
        );
      }
    },
  ),
);
