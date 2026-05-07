import { middleware } from "@io-ipatente/core";

import { auth } from "@/auth";

export default auth(middleware);

export const config = {
  matcher: [
    "/",
    "/api/auth/callback/fims",
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|mockServiceWorker.js|favicon.ico).*)",
  ],
};
