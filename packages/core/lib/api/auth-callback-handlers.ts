import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

const PREFIX_COOKIE = "authjs.";

const handleAuthCallback = async (req: NextRequest): Promise<NextResponse> => {
  const cookies: Record<string, string> = {};

  req.nextUrl.searchParams.forEach((value, key) => {
    if (key.startsWith(PREFIX_COOKIE)) {
      cookies[key] = value;
    }
  });

  req.nextUrl.pathname = "/api/auth/callback/fims";

  req.nextUrl.searchParams.forEach((_, key) => {
    if (key.startsWith(PREFIX_COOKIE)) {
      req.nextUrl.searchParams.delete(key);
    }
  });

  const response = NextResponse.redirect(req.nextUrl);

  Object.entries(cookies).forEach(([key, value]) => {
    response.cookies.set(key, value);
  });

  return response;
};

type AppRouteHandlers = Record<
  "GET",
  (req: NextRequest) => Promise<NextResponse>
>;

interface AuthCallbackResult {
  handlers: AppRouteHandlers;
}

export const AuthCallback: AuthCallbackResult = {
  handlers: {
    GET: async (req: NextRequest) => handleAuthCallback(req),
  },
};
