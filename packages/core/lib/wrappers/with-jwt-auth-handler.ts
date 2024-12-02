import { NextResponse } from "next/server";
import { NextAuthResult, User } from "next-auth";

import { handleUnauthorizedErrorResponse } from "../utils/errors";

type AuthParams = Parameters<NextAuthResult["auth"]>;

export const withJWTAuthHandler =
  (
    handler: (
      request: Request,
      context: {
        params: Record<string, string | string[]> | undefined;
        user: User;
      },
    ) => Promise<NextResponse> | Promise<Response>,
  ): AuthParams[0] =>
  (request, ctx) => {
    const { auth } = request;

    if (!auth) {
      return handleUnauthorizedErrorResponse("No Authentication provided");
    }

    return handler(request, {
      params: ctx.params,
      user: auth.user,
    });
  };
