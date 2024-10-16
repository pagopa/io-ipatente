import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

import { CustomUser } from "../../../types/next-auth";
import { handleUnauthorizedErrorResponse } from "./errors";

export const withJWTAuthHandler =
  (
    handler: (
      nextRequest: NextRequest,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      context: { params: any; user: CustomUser },
    ) => Promise<NextResponse> | Promise<Response>,
  ) =>
  async (
    nextRequest: NextRequest,
    { params }: { params: Record<string, unknown> },
  ) => {
    const authDetails = await getToken({ req: nextRequest });

    if (!authDetails) {
      return handleUnauthorizedErrorResponse("No Authentication provided");
    }
    // call final handler injecting token payload
    return handler(nextRequest, {
      params,
      user: authDetails,
    });
  };
