import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { User } from "next-auth";

import { handleUnauthorizedErrorResponse } from "./errors";

export const withJWTAuthHandler =
  (
    handler: (
      nextRequest: NextRequest,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      context: { params: any; user: User },
    ) => Promise<NextResponse> | Promise<Response>,
  ) =>
  async (
    nextRequest: NextRequest,
    { params }: { params: Record<string, unknown> },
  ) => {
    const session = await auth();

    if (!session) {
      return handleUnauthorizedErrorResponse("No Authentication provided");
    }
    // call final handler injecting token payload
    return handler(nextRequest, {
      params,
      user: session.user,
    });
  };
