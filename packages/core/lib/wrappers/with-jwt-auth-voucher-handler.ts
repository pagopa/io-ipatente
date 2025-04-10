import { NextResponse } from "next/server";
import { User } from "next-auth";

import { Voucher } from "../interop/voucher";
import { AuthRouteHandler } from "../types";
import { withJWTAuthHandler } from "./with-jwt-auth-handler";
import { withVoucherHandler } from "./with-voucher-handler";

export const withJWTAuthAndVoucherHandler = (
  handler: (
    request: Request,
    context: {
      additionalDataJWS: string;
      params?: Record<string, string | string[]>;
      user: User;
      voucher: Voucher;
    },
  ) => Promise<NextResponse> | Promise<Response>,
): AuthRouteHandler =>
  withJWTAuthHandler((request, jwtContext) =>
    withVoucherHandler(
      (request, voucherContext) =>
        handler(request, {
          ...jwtContext,
          ...voucherContext,
        }),
      jwtContext.user.fiscalCode,
    )(request, jwtContext),
  );
