import { NextResponse } from "next/server";

import { Voucher } from "../interop/voucher";
import { withApiKeyHandler } from "./with-api-key-handler";
import { withVoucherHandler } from "./with-voucher-handler";

// Definisci l'interfaccia per il contesto combinato
interface CombinedContext {
  additionalDataJWS: string;
  apiKey: string;
  testUser: string;
  voucher: Voucher;
}

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
  withApiKeyHandler(async (request, apiKeyContext) =>
    withVoucherHandler(async (request, voucherContext) => {
      const combinedContext: CombinedContext = {
        ...apiKeyContext,
        ...voucherContext,
      };
      return handler(request, combinedContext);
    }, apiKeyContext.testUser)(request),
  );
