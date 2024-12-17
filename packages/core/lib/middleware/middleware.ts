import { NextRequest, NextResponse, userAgent } from "next/server";

import { getConfiguration } from "../config";
import { AuthRouteHandler } from "../types";
import {
  CONSENT_URL,
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
  // Check if the request is coming from the native flow
  if (!isBrowserContext(request)) {
    // If the request is from the native flow and targets the FIMS callback URL,
    // redirect it to the cookie callback URL by adding the cookies as query parameters
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
    // redirect them to the sign-in page
    const signinUrl = new URL(SIGNIN_URL, request.nextUrl.origin);
    return NextResponse.rewrite(signinUrl);
  }

  // If the URL is targeting the FIMS callback URL, continue the process
  if (request.nextUrl.pathname === FIMS_CALLBACK_URL) {
    return NextResponse.next();
  }

  // If the URL is targeting the consent page, continue the process
  if (request.nextUrl.pathname === CONSENT_URL) {
    return NextResponse.next();
  }

  // If the cookie `io-ipatente-consent` is NOT present, redirect to the consent page
  if (!request.cookies.has("io-ipatente-consent")) {
    return NextResponse.redirect(new URL(CONSENT_URL, request.nextUrl.origin));
  }

  return NextResponse.next();
};

export const middleware: AuthRouteHandler = withDevMode(handleRequest);
