import { getMockForbiddenResponse } from "@/app/api/auth/mocks/mocks-util";
import { getConfiguration } from "@io-ipatente/core";
import { NextResponse } from "next/server";

// GET without params are statics, this will force the route to be dynamic
export const dynamic = "force-dynamic";

export async function GET() {
  if (!getConfiguration().OIDC_MOCK_FORCED_ENABLE)
    return getMockForbiddenResponse();

  return NextResponse.json({}, { status: 200 });
}
