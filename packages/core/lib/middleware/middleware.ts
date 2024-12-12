import { NextRequest, NextResponse, userAgent } from "next/server";

import { getConfiguration } from "../config";
import { AuthRouteHandler } from "../types";
import {
  FIMS_CALLBACK_COOKIES_URL,
  FIMS_CALLBACK_URL,
  SIGNIN_URL,
} from "../utils";

const isBrowserContext = (request: NextRequest) =>
  !!userAgent(request).browser.name;

const withDevMode =
  (middleware: AuthRouteHandler): AuthRouteHandler =>
  (request, ctx) => {
    const { DEV_MODE } = getConfiguration();

    if (DEV_MODE) {
      // If the URL is targeting the callback URL or if the user
      // is already authenticated, continue the process.
      if (request.nextUrl.pathname === FIMS_CALLBACK_URL || request.auth) {
        return NextResponse.next();
      }
      // If the user is not authenticated, redirect them to the sign-in page.
      return NextResponse.rewrite(new URL(SIGNIN_URL, request.nextUrl.origin));
    }

    return middleware(request, ctx);
  };

const handleRequest: AuthRouteHandler = (request) => {
  // Checks if the request is coming from in-app browser
  // - If the user is authenticated, continue the process.
  // - If the user is not authenticated, return undefined (no action needed here).
  if (isBrowserContext(request)) {
    return request.auth ? NextResponse.next() : undefined;
  }

  // If the request comes from the native flow and is targeting the FIMS callback URL,
  // redirect it to the cookie callback URL by adding the cookies as query parameters.
  // The constructed URL will be opened in the in-app browser.
  if (request.nextUrl.pathname === FIMS_CALLBACK_URL) {
    const redirectUrl = request.nextUrl;
    redirectUrl.pathname = FIMS_CALLBACK_COOKIES_URL;
    request.cookies
      .getAll()
      .forEach((cookie) =>
        redirectUrl.searchParams.set(cookie.name, cookie.value),
      );
    return NextResponse.redirect(redirectUrl);
  }

  // If the request comes from the native flow and the user is not authenticated,
  // redirect them to the sign-in page.
  const signinUrl = new URL(SIGNIN_URL, request.nextUrl.origin);
  return NextResponse.rewrite(signinUrl);
};

export const middleware: AuthRouteHandler = withDevMode(handleRequest);
