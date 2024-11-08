import type { NextRequest } from "next/server";

import { getMockForbiddenResponse } from "@/app/api/auth/mocks/mocks-util";
import { getConfiguration } from "@io-ipatente/core";
import { NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  if (getConfiguration().IS_PRODUCTION) return getMockForbiddenResponse();

  // Get query params
  const redirect_uri = request.nextUrl.searchParams.get("redirect_uri") ?? "";
  const state = request.nextUrl.searchParams.get("state") ?? "";

  // Simulate a mock authorization code
  const code = "mock-auth-code";

  // Redirect to client with auth code and state params
  return NextResponse.redirect(`${redirect_uri}?code=${code}&state=${state}`);
}
