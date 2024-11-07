import { NextRequest, NextResponse, userAgent } from "next/server";
import { NextAuthResult } from "next-auth";

const isBrowserContext = (request: NextRequest) =>
  !!userAgent(request).browser.name;

export const SIGNIN_URL = "/api/auth/signin";
export const FIMS_CALLBACK_URL = "/api/auth/callback/fims";
export const COOKIES_CALLBACK_URL = "/api/auth/callback/fims/cookies";

type AuthParams = Parameters<NextAuthResult["auth"]>;

export const handleAuthRequest: AuthParams[0] = (request) => {
  if (request.nextUrl.pathname === FIMS_CALLBACK_URL) {
    if (!isBrowserContext(request)) {
      const redirectUrl = request.nextUrl;
      redirectUrl.pathname = COOKIES_CALLBACK_URL;
      request.cookies
        .getAll()
        .forEach((cookie) =>
          redirectUrl.searchParams.set(cookie.name, cookie.value),
        );
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (!request.auth) {
    return NextResponse.rewrite(new URL(SIGNIN_URL, request.nextUrl.origin));
  }
};
