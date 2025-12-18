import { auth } from "@/auth";
import { Patenti } from "@/generated/bff-openapi";
import { retrieveLicences } from "@/lib/bff/business";
import { logger } from "@/lib/bff/logger";
import {
  ManagedInternalError,
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
        const res = await retrieveLicences()(
          additionalDataJWS,
          voucher.access_token,
          user.fiscalCode,
        );

        const licences = Patenti.safeParse(res);

        if (!licences.success) {
          throw new ManagedInternalError(
            "[DG_MOT] Validation failed: Invalid licence data from DG_MOT",
            licences.error,
          );
        }

        return NextResponse.json(licences.data);
      } catch (error) {
        handlerErrorLog(logger)(
          "An Error has occurred while retrieving licences",
          error,
        );

        return handleInternalErrorResponse("LicencesRetrieveError", error);
      }
    },
  ),
);
