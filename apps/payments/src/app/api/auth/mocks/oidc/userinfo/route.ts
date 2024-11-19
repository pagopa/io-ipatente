import { getMockForbiddenResponse } from "@/app/api/auth/mocks/mocks-util";
import { getConfiguration } from "@io-ipatente/core";
import { NextResponse } from "next/server";

export async function GET() {
  if (!getConfiguration().OIDC_MOCK_FORCED_ENABLE)
    return getMockForbiddenResponse();

  return NextResponse.json(
    {
      family_name: "Rossi",
      fiscal_code: "BRNGCM85P19H501Z",
      given_name: "Mario",
      sub: "1234567890",
    },
    { status: 200 },
  );
}
