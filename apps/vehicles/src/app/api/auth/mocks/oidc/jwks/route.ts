import { getMockForbiddenResponse } from "@/app/api/auth/mocks/mocks-util";
import { getConfiguration } from "@io-ipatente/core";
import { NextResponse } from "next/server";

export async function GET() {
  if (getConfiguration().IS_PRODUCTION) return getMockForbiddenResponse();

  return NextResponse.json(
    {
      keys: [
        {
          alg: "RS256",
          e: "AQAB",
          kid: "mock-key-id",
          kty: "RSA",
          n: getConfiguration().OIDC_MOCK_JWT_PUBLIC_KEY,
          use: "sig",
        },
      ],
    },
    { status: 200 },
  );
}
