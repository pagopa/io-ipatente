/* eslint-disable no-console */
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { getConfiguration } from "../config";
import { FIMS_CALLBACK_URL } from "../utils";

const PREFIX_COOKIE = "authjs.";

const handleAuthCallback = async (req: NextRequest): Promise<NextResponse> => {
  const cookies: Record<string, string> = {};
  const cookiesToBeDeleted: string[] = [];

  req.nextUrl.searchParams.forEach((value, key) => {
    if (key.includes(PREFIX_COOKIE)) {
      console.log("FOUND: ", key);
      cookiesToBeDeleted.push(key);
      cookies[key] = value;
    }
  });

  console.log("COOKIES SELECTED: ", cookies);
  console.log("PRE-REDIRECT: ", req);
  console.log("PRE-REDIRECT-NEXT-URL: ", req.nextUrl);
  console.log("PRE-REDIRECT-NEXT-URL-ORIGIN: ", req.nextUrl.origin);
  console.log("PRE-REDIRECT-AUTH-URL: ", process.env.AUTH_URL);
  console.log(
    "PRE-REDIRECT-NEXT_PUBLIC_BFF_API_BASE_URL: ",
    getConfiguration().BFF_API_BASE_URL,
  );

  req.nextUrl.pathname = FIMS_CALLBACK_URL;

  for (const cookie of cookiesToBeDeleted) {
    console.log("DELETING: ", cookie);
    req.nextUrl.searchParams.delete(cookie);
  }

  const applicationDomain = getConfiguration().BFF_API_BASE_URL.replace(
    "https://",
    "",
  );

  const redirectCallbackUrl = req.nextUrl.clone();
  redirectCallbackUrl.host = applicationDomain;
  redirectCallbackUrl.port = "";

  console.log("POST-CALLBACKURL-CALC: ", redirectCallbackUrl);
  console.log("POST-CALLBACKURL-CALC-ORIGIN: ", redirectCallbackUrl.origin);

  const response = NextResponse.redirect(redirectCallbackUrl);

  Object.entries(cookies).forEach(([key, value]) => {
    response.cookies.set(key, value, {
      domain: applicationDomain,
    });
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
