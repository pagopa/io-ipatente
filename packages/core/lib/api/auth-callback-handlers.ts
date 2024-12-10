import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { FIMS_CALLBACK_URL } from "../utils";

const PREFIX_COOKIE = "authjs.";

const handleAuthCallback = async (req: NextRequest): Promise<NextResponse> => {
  const cookies: Record<string, string> = {};

  req.nextUrl.searchParams.forEach((value, key) => {
    if (key.startsWith(PREFIX_COOKIE)) {
      cookies[key] = value;
    }
  });

  // eslint-disable-next-line no-console
  console.log("PRE-REDIRECT: ", req);
  // eslint-disable-next-line no-console
  console.log("PRE-REDIRECT-NEXT-URL: ", req.nextUrl);
  // eslint-disable-next-line no-console
  console.log("PRE-REDIRECT-NEXT-URL-ORIGIN: ", req.nextUrl.origin);
  // eslint-disable-next-line no-console
  console.log("PRE-REDIRECT-AUTH-URL: ", process.env.AUTH_URL);

  req.nextUrl.pathname = FIMS_CALLBACK_URL;

  req.nextUrl.searchParams.forEach((_, key) => {
    if (key.startsWith(PREFIX_COOKIE)) {
      req.nextUrl.searchParams.delete(key);
    }
  });

  const redirectCallbackUrl = new URL(FIMS_CALLBACK_URL, req.nextUrl.origin);
  const response = NextResponse.redirect(redirectCallbackUrl);

  Object.entries(cookies).forEach(([key, value]) => {
    response.cookies.set(key, value);
  });

  // eslint-disable-next-line no-console
  console.log("POST-REDIRECT: ", response);

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
