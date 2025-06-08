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
  jwt.sign(payload, process.env.OIDC_MOCK_JWT_PRIVATE_KEY as string, {
    algorithm: "RS256",
    expiresIn: "1h",
  });

export async function POST() {
  const data = {
    aud: process.env.OIDC_CLIENT_ID as string,
    email: "mario.rossi@example.com",
    family_name: "Rossi",
    given_name: "Mario",
    iss: process.env.OIDC_ISSUER_URL as string,
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
