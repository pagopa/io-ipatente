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

        if (res instanceof AxiosError) {
          logger.error(
            `LoadTest [AxiosError] internal retrieveLicences: TestUser: ${testUser}  Status: ${
              res.status
            } , Code: ${res.code} , Message:${res.message} , Cause: ${
              res.cause
            } , Response :${JSON.stringify(res.response?.data)}`,
          );
          return handleAxiosErrorResponse(res, ErrorSource.BFF);
        }

        if (res instanceof ZodiosError) {
          return handleBadRequestErrorResponse(res.message, ErrorSource.BFF);
        }

        logger.error(
          `LoadTest [GenericError] internal retrieveLicences Error: ${JSON.stringify(
            res,
          )}`,
        );

        return handleInternalErrorResponse(
          "InternalLicencesRetrieveError",
          res,
          ErrorSource.BFF,
        );
      } catch (error) {
        logger.error(
          `An Error has occurred while retrieving user licences [Internal] , caused by: `,
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
