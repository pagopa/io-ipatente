import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

import { getConfiguration } from "../config";
import { CoreLogger } from "../types/logger";
import { FIMS_CALLBACK_URL, FimsError, handlerErrorLog } from "../utils";

const PREFIX_COOKIE = "authjs.";

const handleAuthCallback =
  (logger: CoreLogger) =>
  async (req: NextRequest): Promise<NextResponse> => {
    try {
      const cookies: Record<string, string> = {};
      const cookiesToBeDeleted: string[] = [];

      req.nextUrl.searchParams.forEach((value, key) => {
        if (key.includes(PREFIX_COOKIE)) {
          cookiesToBeDeleted.push(key);
          cookies[key] = value;
        }
      });

      if (Object.keys(cookies).length === 0) {
        throw new FimsError("No auth cookies found in callback");
      }

      for (const cookie of cookiesToBeDeleted) {
        req.nextUrl.searchParams.delete(cookie);
      }

      req.nextUrl.pathname = FIMS_CALLBACK_URL;

      // Calc callbackURL
      const callBackProtocol =
        req.headers.get("x-forwarded-proto") ?? req.nextUrl.protocol;
      const callBackHost =
        req.headers.get("x-forwarded-host") ?? req.nextUrl.host;

      const envOrigin = `${callBackProtocol}://${callBackHost}`;
      const { href, origin } = req.nextUrl;

      const response = NextResponse.redirect(
        href.replace(origin, envOrigin),
        req,
      );

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
    } catch (error) {
      handlerErrorLog(logger)("Auth callback error", error);
      throw error;
    }
  };

type AppRouteHandlers = Record<
  "GET",
  (req: NextRequest) => Promise<NextResponse>
>;

interface AuthCallbackResult {
  handlers: AppRouteHandlers;
}

export const AuthCallback = (logger: CoreLogger): AuthCallbackResult => ({
  handlers: {
    GET: async (req: NextRequest) => handleAuthCallback(logger)(req),
  },
});
