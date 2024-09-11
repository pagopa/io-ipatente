import { getMockForbiddenResponse } from "@/app/api/auth/mocks/mocks-util";
import { getConfiguration } from "@/config";
import { NextResponse } from "next/server";

export async function GET() {
  if (getConfiguration().IS_PRODUCTION) return getMockForbiddenResponse();

  return NextResponse.json(
    {
      family_name: "Rossi",
      fiscal_code: "RSSMRA81A01H501V",
      given_name: "Mario",
      sub: "1234567890",
    },
    { status: 200 },
  );
}
