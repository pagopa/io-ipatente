import { auth } from "@/auth";
import { Pagamento } from "@/generated/bff-openapi";
import { retrievePayments } from "@/lib/bff/business";
import { logger } from "@/lib/bff/logger";
import {
  BffError,
  handleInternalErrorResponse,
  handlerErrorLog,
  withTestUserAndVoucherInternalHandler,
} from "@io-ipatente/core";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

/**
 * @description Retrieve user payments
 */
export const GET = auth(
  withTestUserAndVoucherInternalHandler(logger)(
    async (_request: Request, { additionalDataJWS, testUser, voucher }) => {
      try {
        const res = await retrievePayments(
          additionalDataJWS,
          voucher.access_token,
          testUser,
        );

        const payments = z.array(Pagamento).safeParse(res);

        if (!payments.success) {
          throw new BffError(
            "Validation failed: Invalid payments data from DG_MOT",
            payments.error,
          );
        }

        return NextResponse.json(payments.data);
      } catch (error) {
        handlerErrorLog(logger)(
          "An Error has occurred while retrieving user payments [Internal]",
          error,
        );

        return handleInternalErrorResponse(
          "InternalPaymentsRetrieveError",
          error,
        );
      }
    },
  ),
);
