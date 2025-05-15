/* eslint-disable no-console */
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
  // Check if the request is coming from a native (non-browser) context
  if (!isBrowserContext(request)) {
    // If the request comes from a native context and targets the FIMS callback URL,
    // redirect it to the cookie callback URL, appending cookies as query parameters.
    if (request.nextUrl.pathname === FIMS_CALLBACK_URL) {
      const redirectUrl = request.nextUrl;
      redirectUrl.pathname = FIMS_CALLBACK_COOKIES_URL;
      request.cookies.getAll().forEach((cookie) => {
        console.log(
          `[middleware] FIMS_CALLBACK_URL cookie ${cookie.name}, value: ${cookie.value}`,
        );
        redirectUrl.searchParams.set(cookie.name, cookie.value);
      });
      return NextResponse.redirect(redirectUrl);
    }

    // If the request comes from a native context and the user is not authenticated,
    // redirect them to the sign-in page.
    const signinUrl = new URL(SIGNIN_URL, request.nextUrl.origin);
    return NextResponse.rewrite(signinUrl);
  }

  console.log(
    "[middleware] request.nextUrl.pathname: " + request.nextUrl.pathname,
  );

  // Allow the request to proceed if it targets the consent page or the callback URL.
  if (
    request.nextUrl.pathname === CONSENT_URL ||
    request.nextUrl.pathname === FIMS_CALLBACK_URL
  ) {
    return NextResponse.next();
  }

  // If the "io-ipatente-consent" cookie is missing, redirect the user to the consent page.
  if (!request.cookies.has("io-ipatente-consent")) {
    console.log(
      "[middleware] No io-ipatente-consent, redirect to consent page",
    );
    const url = new URL(CONSENT_URL, request.nextUrl.origin);
    // Append the original path as a query parameter so that, after giving consent,
    // the user can be redirected back to their original destination.
    console.log(
      "[middleware] request.nextUrl.pathname: " + request.nextUrl.pathname,
    );
    console.log(
      "[middleware] request.nextUrl.search: " + request.nextUrl.search,
    );
    console.log(
      "[middleware] request.nextUrl.searchParams: " +
        request.nextUrl.searchParams,
    );
    url.searchParams.set(
      "redirectPath",
      request.nextUrl.pathname + request.nextUrl.search,
    );
    console.log("[middleware] consent url: " + url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
};

export const middleware: AuthRouteHandler = withDevMode(handleRequest);
