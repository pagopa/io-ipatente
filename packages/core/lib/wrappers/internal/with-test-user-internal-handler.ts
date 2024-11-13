import { NextResponse } from "next/server";

import { getConfiguration } from "../../config";

const { INTERNAL_ROUTES_ENABLED, INTERNAL_ROUTES_TEST_USER } =
  getConfiguration();
/**
 * @description Wraps a handler to be used only by internal routes with a test user
 * @param handler - The handler to wrap
 * @returns The wrapped handler
 * @example
 * ```ts
 * export const GET = withTestUserInternalHandler(
 *  async (_request: Request, { testUser }) => {
 *   return NextResponse.json({ testUser });
 *  },
 * );
 * ```
 **/
export const withTestUserInternalHandler =
  <
    T extends (
      request: Request,
      context: {
        testUser: string;
      },
    ) => Promise<NextResponse> | Promise<Response>,
  >(
    handler: T,
  ) =>
  async (request: Request): Promise<NextResponse | Response> => {
    if (!INTERNAL_ROUTES_ENABLED) {
      return NextResponse.json(
        { error: "Forbidden: Internal routes are disabled" },
        { status: 403 },
      );
    }

    const testUser = request.headers.get("X-TEST-USER");

    if (!testUser || !INTERNAL_ROUTES_TEST_USER.includes(testUser)) {
      return NextResponse.json(
        { error: "Forbidden: Invalid Test User" },
        { status: 403 },
      );
    }

    return handler(request, { testUser });
  };
