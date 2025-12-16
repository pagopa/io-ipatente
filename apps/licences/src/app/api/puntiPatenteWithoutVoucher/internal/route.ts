import { auth } from "@/auth";
import { Patenti } from "@/generated/bff-openapi";
import { retrieveLicences } from "@/lib/bff/business";
import { logger } from "@/lib/bff/logger";
import {
  ErrorSource,
  handleAxiosErrorResponse,
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
  withTestUserInternalHandler,
} from "@io-ipatente/core";
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

      const licences = Patenti.safeParse(res);

      if (licences.success) {
        return NextResponse.json(licences.data);
      }

      logger.error(
        `LoadTestWithoutVoucher [ValidationError] internal retrieveLicences validation failed: ${JSON.stringify(
          licences.error,
        )}`,
      );

      return handleBadRequestErrorResponse(
        "Invalid response format",
        ErrorSource.DG_MOT,
      );
    } catch (error) {
      const endTime = new Date().getTime();

      if (error instanceof AxiosError) {
        logger.error(
          `LoadTestWithoutVoucher [AxiosError] internal retrieveLicences duration: ${
            endTime - startTime
          } Status: ${error.status} Cause: ${error.cause}`,
        );

        return handleAxiosErrorResponse(error, ErrorSource.DG_MOT);
      }

      if (error instanceof ZodiosError) {
        logger.error(
          `LoadTestWithoutVoucher [ZodiosError] internal retrieveLicences Error: ${error.message}`,
        );
        return handleBadRequestErrorResponse(error.message, ErrorSource.BFF);
      }

      logger.error(
        `LoadTestWithoutVoucher [GenericError] An Error has occurred while retrieving user licences [Internal] , caused by: `,
        { error },
      );

      return handleInternalErrorResponse(
        "InternalLicencesRetrieveError",
        error,
        ErrorSource.BFF,
      );
    }
  }),
);
