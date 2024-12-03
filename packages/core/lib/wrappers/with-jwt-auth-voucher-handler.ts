import { NextResponse } from "next/server";
import { NextAuthResult, User } from "next-auth";

import { Voucher } from "../interop/voucher";
import { withJWTAuthHandler } from "./with-jwt-auth-handler";
import { withVoucherHandler } from "./with-voucher-handler";

type AuthParams = Parameters<NextAuthResult["auth"]>;

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
): AuthParams[0] =>
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
