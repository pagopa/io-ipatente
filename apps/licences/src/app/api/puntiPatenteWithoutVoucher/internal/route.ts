import { auth } from "@/auth";
import { Patenti } from "@/generated/bff-openapi";
import { retrieveLicences } from "@/lib/bff/business";
import { logger } from "@/lib/bff/logger";
import {
  ManagedInternalError,
  handleInternalErrorResponse,
  handlerErrorLog,
  withTestUserInternalHandler,
} from "@io-ipatente/core";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @description Retrieve user licences
 */
export const GET = auth(
  withTestUserInternalHandler(async (_request: Request, { testUser }) => {
    const additionalDataJWS = _request.headers.get("Agid-JWT-TrackingEvidence");
    const voucher = _request.headers.get("Authorization");
    const startTime = new Date().getTime();
    try {
      const res = await retrieveLicences()(
        additionalDataJWS ?? "",
        voucher ?? "",
        testUser,
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
      const endTime = new Date().getTime();
      handlerErrorLog(logger)(
        `An Error has occurred while retrieving licences [Internal]. 
        LoadTestWithoutVoucher [AxiosError] internal retrieveLicences duration: ${
          endTime - startTime
        }`,
        error,
      );

      return handleInternalErrorResponse(
        "InternalLicencesRetrieveError",
        error,
      );
    }
  }),
);
