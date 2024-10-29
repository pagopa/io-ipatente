import { Voucher } from "@io-ipatente/core";
import { NextRequest, NextResponse } from "next/server";

import { CustomUser } from "../../../types/next-auth";
import { withJWTAuthHandler } from "./with-jwt-auth-handler";
import { withVoucherHandler } from "./with-voucher-handler";

export const withJWTAuthAndVoucherHandler = (
  handler: (
    nextRequest: NextRequest,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: { params: any; user: CustomUser; voucher: Voucher },
  ) => Promise<NextResponse> | Promise<Response>,
) =>
  withJWTAuthHandler(async (nextRequest, jwtContext) =>
    withVoucherHandler(async (nextRequest, voucherContext) =>
      handler(nextRequest, {
        ...jwtContext,
        ...voucherContext,
      }),
    )(nextRequest, jwtContext),
  );
