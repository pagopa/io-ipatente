import { NextResponse } from "next/server";

export const withApiKeyHandler =
  <
    T extends (
      request: Request,
      context: {
        apiKey: string;
        testUser: string;
      },
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
        { error: "Forbidden: Invalid Test User" },
        { status: 403 },
      );
    }

    return handler(request, { apiKey, testUser });
  };
