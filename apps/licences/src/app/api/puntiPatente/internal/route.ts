import { auth } from "@/auth";
import { Patenti } from "@/generated/bff-openapi";
import { retrieveLicences } from "@/lib/bff/business";
import { logger } from "@/lib/bff/logger";
import {
  BffError,
  handleInternalErrorResponse,
  handlerErrorLog,
  withTestUserAndVoucherInternalHandler,
} from "@io-ipatente/core";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @description Retrieve user licences
 */
export const GET = auth(
  withTestUserAndVoucherInternalHandler(logger)(
    async (_request: Request, { additionalDataJWS, testUser, voucher }) => {
      try {
        const res = await retrieveLicences(
          additionalDataJWS,
          voucher.access_token,
          testUser,
        );

        const licences = Patenti.safeParse(res);

        if (!licences.success) {
          throw new BffError(
            "Validation failed: Invalid licence data from DG_MOT",
            licences.error,
          );
        }

        return NextResponse.json(licences.data);
      } catch (error) {
        handlerErrorLog(logger)(
          "An Error has occurred while retrieving licences [Internal]",
          error,
        );

        return handleInternalErrorResponse(
          "InternalLicencesRetrieveError",
          error,
        );
      }
    },
  ),
);
