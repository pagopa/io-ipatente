import { auth } from "@/auth";
import { Patenti } from "@/generated/bff-openapi";
import { retrieveLicences } from "@/lib/bff/business";
import {
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
  withJWTAuthAndVoucherHandler(
    async (_request: Request, { additionalDataJWS, user, voucher }) => {
      try {
        const res = await retrieveLicences(
          additionalDataJWS,
          voucher.access_token,
          user.fiscalCode,
        );

        const licences = Patenti.safeParse(res);

        if (licences.success) {
          return NextResponse.json(licences.data);
        }

        if (res instanceof AxiosError) {
          console.error(
            `[AxiosError] retrieveLicences Status: ${res.status} , Code: ${res.code} , Message:${res.message} , Cause: ${res.cause} , Response :${res.response}`,
          );
          return NextResponse.json(
            { detail: res.message, status: res.status },
            { status: res.status },
          );
        }

        if (res instanceof ZodiosError) {
          return handleBadRequestErrorResponse(res.message);
        }

        return handleInternalErrorResponse("LicencesRetrieveError", res);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `An Error has occurred while retrieving user licences, caused by: `,
          error,
        );
        return handleInternalErrorResponse("LicencesRetrieveError", error);
      }
    },
  ),
);
