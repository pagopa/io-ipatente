import { NextResponse } from "next/server";
import { User } from "next-auth";

import { AuthRouteHandler } from "../types";
import { handleUnauthorizedErrorResponse } from "../utils/errors";

export const withJWTAuthHandler =
  (
    handler: (
      request: Request,
      context: {
        params?: Record<string, string | string[]>;
        user: User;
      },
    ) => Promise<NextResponse> | Promise<Response>,
  ): AuthRouteHandler =>
  (request, ctx) => {
    const { auth } = request;

    if (!auth) {
      return handleUnauthorizedErrorResponse("No Authentication provided");
    }

    return handler(request, {
      ...ctx,
      user: auth.user,
    });
  };
