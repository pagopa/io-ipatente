import { auth } from "@/auth";
import { Patenti } from "@/generated/bff-openapi";
import { retrieveLicences } from "@/lib/bff/business";
import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
  withTestUserInternalHandler,
} from "@io-ipatente/core";
import { logger } from "@io-ipatente/logger";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
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
      const res = await retrieveLicences(logger)(
        additionalDataJWS ?? "",
        voucher ?? "",
        testUser,
      );
      const endTime = new Date().getTime();

      const licences = Patenti.safeParse(res);

      if (licences.success) {
        return NextResponse.json(licences.data);
      }

      if (res instanceof AxiosError) {
        logger.error(
          `LoadTestWithoutVoucher [AxiosError] internal retrieveLicences duration: ${
            endTime - startTime
          } Status: ${res.status} Cause: ${res.cause},`,
        );
        return NextResponse.json(
          { detail: res.message, status: res.status },
          { status: res.status },
        );
      }

      if (res instanceof ZodiosError) {
        return handleBadRequestErrorResponse(res.message);
      }

      return handleInternalErrorResponse("InternalLicencesRetrieveError", res);
    } catch (error) {
      logger.error(
        `An Error has occurred while retrieving user licences [Internal] , caused by: `,
        { error },
      );
      return handleInternalErrorResponse(
        "InternalLicencesRetrieveError",
        error,
      );
    }
  }),
);
