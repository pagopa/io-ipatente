import { getMockForbiddenResponse } from "@/app/api/auth/mocks/mocks-util";
import { getConfiguration } from "@/config";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

interface MockTokenPayload {
  aud: string;
  email: string;
  family_name: string;
  given_name: string;
  iss: string;
  name: string;
  sub: string;
}

const generateToken = (payload: MockTokenPayload): string =>
  jwt.sign(payload, getConfiguration().OIDC_MOCK_JWT_PRIVATE_KEY as string, {
    algorithm: "RS256",
    expiresIn: "1h",
  });

export async function POST() {
  if (getConfiguration().IS_PRODUCTION) return getMockForbiddenResponse();

  const data = {
    aud: getConfiguration().OIDC_CLIENT_ID,
    email: "mario.rossi@example.com",
    family_name: "Rossi",
    given_name: "Mario",
    iss: getConfiguration().OIDC_ISSUER_URL,
    name: "mario",
    sub: "1234567890",
  };
  const accessToken = generateToken(data);
  const idToken = generateToken(data);

  return NextResponse.json(
    {
      access_token: accessToken,
      expires_in: 3600,
      id_token: idToken,
      token_type: "Bearer",
    },
    { status: 200 },
  );
}
