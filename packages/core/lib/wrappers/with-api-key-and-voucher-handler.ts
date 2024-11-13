import { NextResponse } from "next/server";

import { Voucher } from "../interop/voucher";
import { withApiKeyHandler } from "./with-api-key-handler";
import { withVoucherHandler } from "./with-voucher-handler";

export const withApiKeyAndVoucherHandler = (
  handler: (
    request: Request,
    context: {
      additionalDataJWS: string;
      testUser: string;
      voucher: Voucher;
    },
  ) => Promise<NextResponse> | Promise<Response>,
) =>
  withApiKeyHandler((request, apiKeyContext) =>
    withVoucherHandler(
      (request, voucherContext) =>
        handler(request, {
          ...apiKeyContext,
          ...voucherContext,
        }),
      apiKeyContext.testUser,
    )(request),
  );
