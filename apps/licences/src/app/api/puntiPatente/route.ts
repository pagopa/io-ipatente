import { auth } from "@/auth";
import { Patenti } from "@/generated/bff-openapi";
import { retrieveLicences } from "@/lib/bff/business";
import { logger } from "@/lib/bff/logger";
import {
  ErrorSource,
  handleAxiosErrorResponse,
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
  withJWTAuthAndVoucherHandler,
} from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @description Retrieve user licences
 */
export const GET = auth(
  withJWTAuthAndVoucherHandler(logger)(
    async (_request: Request, { additionalDataJWS, user, voucher }) => {
      try {
        const res = await retrieveLicences(logger)(
          additionalDataJWS,
          voucher.access_token,
          user.fiscalCode,
        );

        const licences = Patenti.safeParse(res);

        if (licences.success) {
          return NextResponse.json(licences.data);
        }

        logger.error(
          `[ValidationError] retrieveLicences validation failed: ${JSON.stringify(
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
            `[AxiosError] retrieveLicences Status: ${error.status} , Code: ${
              error.code
            } , Message:${error.message} , Cause: ${
              error.cause
            } , Response :${JSON.stringify(error.response?.data)}`,
          );
          return handleAxiosErrorResponse(error, ErrorSource.BFF);
        }

        if (error instanceof ZodiosError) {
          logger.error(
            `[ZodiosError] retrieveLicences Error: ${error.message}`,
          );
          return handleBadRequestErrorResponse(error.message, ErrorSource.BFF);
        }

        logger.error(
          `[GenericError] An Error has occurred while retrieving user licences, caused by: `,
          { error },
        );

        return handleInternalErrorResponse(
          "LicencesRetrieveError",
          error,
          ErrorSource.BFF,
        );
      }
    },
  ),
);
