/* eslint-disable no-console */
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { FIMS_CALLBACK_URL } from "../utils";

const PREFIX_COOKIE = "authjs.";

const handleAuthCallback = async (req: NextRequest): Promise<NextResponse> => {
  const cookies: Record<string, string> = {};
  const cookiesToBeDeleted: string[] = [];

  req.nextUrl.searchParams.forEach((value, key) => {
    if (key.includes(PREFIX_COOKIE)) {
      console.log("FOUND COOKIE: ", key);
      cookiesToBeDeleted.push(key);
      cookies[key] = value;
    }
  });

  console.log("PRE-REDIRECT: ", req);
  console.log("PRE-REDIRECT-NEXT-URL: ", req.nextUrl);
  console.log("PRE-REDIRECT-NEXT-URL-ORIGIN: ", req.nextUrl.origin);

  for (const cookie of cookiesToBeDeleted) {
    console.log("DELETING: ", cookie);
    req.nextUrl.searchParams.delete(cookie);
  }

  req.nextUrl.pathname = FIMS_CALLBACK_URL;

  // Calc callbackURL
  const callBackProtocol =
    req.headers.get("x-forwarded-proto") ?? req.nextUrl.protocol;
  const callBackHost =
    req.headers.get("x-forwarded-host") ?? req.headers.get("host");

  const envOrigin = `${callBackProtocol}://${callBackHost}`;
  const { href, origin } = req.nextUrl;

  const response = NextResponse.redirect(href.replace(origin, envOrigin), req);

  Object.entries(cookies).forEach(([key, value]) => {
    response.cookies.set(key, value);
  });

  console.log("POST-REDIRECT: ", response);
  console.log("POST-REDIRECT-COOKIES: ", response.cookies);

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
