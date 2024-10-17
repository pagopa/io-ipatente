import { auth } from "@/auth";
import { NextRequest, NextResponse, userAgent } from "next/server";

const isBrowserContext = (request: NextRequest) =>
  !!userAgent(request).browser.name;

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/api/auth/callback/fims") {
    if (!isBrowserContext(request)) {
      const redirectUrl = request.nextUrl;
      redirectUrl.pathname = "/api/auth/callback/fims/cookies";
      request.cookies
        .getAll()
        .forEach((cookie) =>
          redirectUrl.searchParams.set(cookie.name, cookie.value),
        );
      return NextResponse.redirect(redirectUrl);
    }
  } else {
    const session = await auth();
    if (!session) {
      return NextResponse.rewrite(
        new URL("/api/auth/signin", request.nextUrl.origin),
      );
    }
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/",
    "/((?!api|_next/static|_next/image|mockServiceWorker.js|favicon.ico).*)",
    "/api/auth/callback/fims",
  ],
};
