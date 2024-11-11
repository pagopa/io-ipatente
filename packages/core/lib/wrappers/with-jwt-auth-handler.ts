import { NextRequest, NextResponse } from "next/server";
import { NextAuthResult, User } from "next-auth";

import { handleUnauthorizedErrorResponse } from "../utils/errors";

type AuthParams = Parameters<NextAuthResult["auth"]>;

export const withJWTAuthHandler =
  (
    handler: (
      request: NextRequest,
      context: { user: User },
    ) => Promise<NextResponse> | Promise<Response>,
  ): AuthParams[0] =>
  (request) => {
    const { auth } = request;

    if (!auth) {
      return handleUnauthorizedErrorResponse("No Authentication provided");
    }

    return handler(request, {
      user: auth.user,
    });
  };
