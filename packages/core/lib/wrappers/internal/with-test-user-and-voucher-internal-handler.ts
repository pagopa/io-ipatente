import { NextResponse } from "next/server";

import { Voucher } from "../../interop/voucher";
import { withVoucherHandler } from "../with-voucher-handler";
import { withTestUserInternalHandler } from "./with-test-user-internal-handler";

/**
 * @description Wraps a handler to be used only by internal routes with a test user and which require the voucher to be injected
 * @param handler - The handler to wrap
 * @returns The wrapped handler
 * @example
 * ```ts
 * export const GET = withTestUserAndVoucherInternalHandler(
 *  async (_request: Request, { additionalDataJWS, testUser, voucher }) => {
 *    return NextResponse.json({ additionalDataJWS, testUser, voucher });
 *  },
 * );
 * ```
 **/
export const withTestUserAndVoucherInternalHandler = (
  handler: (
    request: Request,
    context: {
      additionalDataJWS: string;
      testUser: string;
      voucher: Voucher;
    },
  ) => Promise<NextResponse> | Promise<Response>,
) =>
  withTestUserInternalHandler((request, testUserContext) =>
    withVoucherHandler(
      (request, voucherContext) =>
        handler(request, {
          ...testUserContext,
          ...voucherContext,
        }),
      testUserContext.testUser,
    )(request),
  );
