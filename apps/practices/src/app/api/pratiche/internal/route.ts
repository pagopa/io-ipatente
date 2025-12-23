import { auth } from "@/auth";
import { Pratica } from "@/generated/bff-openapi";
import { retrievePractices } from "@/lib/bff/business";
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
 * @description Retrieve user practices
 */
export const GET = auth(
  withTestUserAndVoucherInternalHandler(logger)(
    async (_request: Request, { additionalDataJWS, testUser, voucher }) => {
      try {
        const res = await retrievePractices()(
          additionalDataJWS,
          voucher.access_token,
          testUser,
        );

        const practices = z.array(Pratica).safeParse(res);

        if (!practices.success) {
          throw new BffError(
            "Validation failed: Invalid practices data from DG_MOT",
            practices.error,
          );
        }

        return NextResponse.json(practices.data);
      } catch (error) {
        handlerErrorLog(logger)(
          "An Error has occurred while retrieving user practices [Internal]",
          error,
        );

        return handleInternalErrorResponse(
          "InternalPracticesRetrieveError",
          error,
        );
      }
    },
  ),
);
