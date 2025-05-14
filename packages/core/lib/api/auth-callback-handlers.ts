/* eslint-disable no-console */
import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { getConfiguration } from "../config";
import { FIMS_CALLBACK_URL } from "../utils";

const PREFIX_COOKIE = "authjs.";

const handleAuthCallback = async (req: NextRequest): Promise<NextResponse> => {
  const cookies: Record<string, string> = {};
  const cookiesToBeDeleted: string[] = [];

  console.log(
    "[handleAuthCallback] req.nextUrl.searchParams (PRE): " +
      req.nextUrl.searchParams,
  );

  req.nextUrl.searchParams.forEach((value, key) => {
    if (key.includes(PREFIX_COOKIE)) {
      cookiesToBeDeleted.push(key);
      cookies[key] = value;
      console.log(`[handleAuthCallback] cookie ${key} = ${value}`);
    }
  });

  for (const cookie of cookiesToBeDeleted) {
    console.log("[handleAuthCallback] cookieToBeDeleted: " + cookie);
    req.nextUrl.searchParams.delete(cookie);
  }

  console.log(
    "[handleAuthCallback] req.nextUrl.searchParams (POST): " +
      req.nextUrl.searchParams,
  );

  console.log("[handleAuthCallback] req: ", req);

  req.nextUrl.pathname = FIMS_CALLBACK_URL;

  // Calc callbackURL
  const callBackProtocol =
    req.headers.get("x-forwarded-proto") ?? req.nextUrl.protocol;
  const callBackHost = req.headers.get("x-forwarded-host") ?? req.nextUrl.host;

  console.log("[handleAuthCallback] req.nextUrl: " + req.nextUrl);

  console.log(
    "[handleAuthCallback] x-forwarded-proto: " +
      req.headers.get("x-forwarded-proto"),
  );
  console.log(
    "[handleAuthCallback] req.nextUrl.protocol: " + req.nextUrl.protocol,
  );
  console.log(
    "[handleAuthCallback] x-forwarded-host: " +
      req.headers.get("x-forwarded-host"),
  );
  console.log("[handleAuthCallback] req.nextUrl.host: " + req.nextUrl.host);

  console.log("[handleAuthCallback] callBackProtocol: " + callBackProtocol);
  console.log("[handleAuthCallback] callBackHost: " + callBackHost);

  const envOrigin = `${callBackProtocol}://${callBackHost}`;
  const { href, origin } = req.nextUrl;

  console.log("[handleAuthCallback] href: " + href);
  console.log("[handleAuthCallback] origin: " + origin);

  console.log(
    "[handleAuthCallback] redirect to: ",
    href.replace(origin, envOrigin),
  );

  const response = NextResponse.redirect(href.replace(origin, envOrigin), req);

  console.log("[handleAuthCallback] response: ", response);

  // Forces deletion of the io-ipatente-consent cookie
  // because it is not deleted when the in-app browser is closed
  response.cookies.delete("io-ipatente-consent");

  Object.entries(cookies).forEach(([key, value]) => {
    response.cookies.set(key, value, {
      domain: getConfiguration().IS_PRODUCTION ? callBackHost : "localhost",
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: callBackProtocol === "https",
    });
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
