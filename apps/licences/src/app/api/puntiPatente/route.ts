import { auth } from "@/auth";
import { retrieveLicences } from "@/lib/bff/business";
import { logger } from "@/lib/bff/logger";
import {
  handleInternalErrorResponse,
  handlerErrorLog,
  withJWTAuthAndVoucherHandler,
} from "@io-ipatente/core";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @description Retrieve user licences
 */
export const GET = auth(
  withJWTAuthAndVoucherHandler(logger)(
    async (_request: Request, { additionalDataJWS, user, voucher }) => {
      try {
        const licences = await retrieveLicences()(
          additionalDataJWS,
          voucher.access_token,
          user.fiscalCode,
        );

        return NextResponse.json(licences);
      } catch (error) {
        handlerErrorLog(
          "An Error has occurred while retrieving licences",
          error,
          logger,
        );

        return handleInternalErrorResponse("LicencesRetrieveError", error);
      }
    },
  ),
);
