import { NextResponse } from "next/server";

// Definisci l'interfaccia per il contesto
interface ApiKeyContext {
  apiKey: string;
  testUser: string;
}

export const withApiKeyHandler =
  <
    T extends (
      request: Request,
      context: ApiKeyContext,
    ) => Promise<NextResponse> | Promise<Response>,
  >(
    handler: T,
  ) =>
  async (request: Request): Promise<NextResponse | Response> => {
    const apiKey = request.headers.get("X-API-KEY");
    const testUser = request.headers.get("X-TEST-USER");

    const expectedApiKey = process.env.SOAK_TEST_API_KEY;
    const allowedTestUsers = process.env.ALLOWED_TEST_USERS
      ? process.env.ALLOWED_TEST_USERS.split(",").map((user) => user.trim())
      : [];

    if (!apiKey || apiKey !== expectedApiKey) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid API Key" },
        { status: 401 },
      );
    }

    if (!testUser || !allowedTestUsers.includes(testUser)) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid Test User" },
        { status: 401 },
      );
    }

    return handler(request, { apiKey, testUser });
  };
