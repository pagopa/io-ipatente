import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      keys: [
        {
          alg: "RS256",
          e: "AQAB",
          kid: "mock-key-id",
          kty: "RSA",
          n: process.env.OIDC_MOCK_JWT_PUBLIC_KEY,
          use: "sig",
        },
      ],
    },
    { status: 200 },
  );
}
