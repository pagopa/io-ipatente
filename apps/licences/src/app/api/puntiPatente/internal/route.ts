import { auth } from "@/auth";
import { Patenti } from "@/generated/bff-openapi";
import { retrieveLicences } from "@/lib/bff/business";
import { logger } from "@/lib/bff/logger";
import {
  ErrorSource,
  handleAxiosErrorResponse,
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
  withTestUserAndVoucherInternalHandler,
} from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @description Retrieve user licences
 */
export const GET = auth(
  withTestUserAndVoucherInternalHandler(logger)(
    async (_request: Request, { additionalDataJWS, testUser, voucher }) => {
      try {
        const res = await retrieveLicences(logger)(
          additionalDataJWS,
          voucher.access_token,
          testUser,
        );

        const licences = Patenti.safeParse(res);

        if (licences.success) {
          return NextResponse.json(licences.data);
        }

        logger.error(
          `LoadTest [ValidationError] internal retrieveLicences validation failed: ${JSON.stringify(
            licences.error,
          )}`,
        );

        return handleBadRequestErrorResponse(
          "Invalid response format",
          ErrorSource.DG_MOT,
        );
      } catch (error) {
        if (error instanceof AxiosError) {
          logger.error(
            `LoadTest [AxiosError] internal retrieveLicences: TestUser: ${testUser}  Status: ${
              error.status
            } , Code: ${error.code} , Message:${error.message} , Cause: ${
              error.cause
            } , Response :${JSON.stringify(error.response?.data)}`,
          );

          return handleAxiosErrorResponse(error, ErrorSource.DG_MOT);
        }

        if (error instanceof ZodiosError) {
          logger.error(
            `LoadTest [ZodiosError] internal retrieveLicences Error: ${error.message}`,
          );
          return handleBadRequestErrorResponse(error.message, ErrorSource.BFF);
        }

        logger.error(
          `LoadTest [GenericError] An Error has occurred while retrieving user licences [Internal] , caused by: `,
          { error },
        );

        return handleInternalErrorResponse(
          "InternalLicencesRetrieveError",
          error,
          ErrorSource.BFF,
        );
      }
    },
  ),
);
