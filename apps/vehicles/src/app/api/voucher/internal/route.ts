import { auth } from "@/auth";
import {
  handleInternalErrorResponse,
  withTestUserAndVoucherInternalHandler,
} from "@io-ipatente/core";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * @description Retrieve user voucher
 */
export const GET = auth(
  withTestUserAndVoucherInternalHandler(
    async (_request: Request, { additionalDataJWS, voucher }) => {
      try {
        return NextResponse.json({ additionalDataJWS, voucher });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `An Error has occurred while retrieving voucher [Internal] , caused by: `,
          error,
        );
        return handleInternalErrorResponse(
          "InternalVoucherRetrieveError",
          error,
        );
      }
    },
  ),
);
