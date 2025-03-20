import { auth } from "@/auth";
import { Patenti } from "@/generated/bff-openapi";
import { retrieveLicences } from "@/lib/bff/business";
import {
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
  withTestUserAndVoucherInternalHandler(
    async (_request: Request, { additionalDataJWS, testUser, voucher }) => {
      const startTime = new Date().getTime();
      try {
        const res = await retrieveLicences(
          additionalDataJWS,
          voucher.access_token,
          testUser,
        );
        const endTime = new Date().getTime();

        const licences = Patenti.safeParse(res);

        if (licences.success) {
          return NextResponse.json(licences.data);
        }

        if (res instanceof AxiosError) {
          console.error(
            `[AxiosError] internal retrieveLicences duration`,
            endTime - startTime,
          );
          return NextResponse.json(
            { detail: res.message, status: res.status },
            { status: res.status },
          );
        }

        if (res instanceof ZodiosError) {
          return handleBadRequestErrorResponse(res.message);
        }

        return handleInternalErrorResponse(
          "InternalLicencesRetrieveError",
          res,
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `An Error has occurred while retrieving user licences [Internal] , caused by: `,
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
