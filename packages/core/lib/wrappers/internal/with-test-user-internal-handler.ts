import { NextResponse } from "next/server";

import { getConfiguration } from "../../config";
import { ErrorSource } from "../../utils/errorTypes";
import { handleForbiddenErrorResponse } from "../../utils/errors";

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
    const { INTERNAL_ROUTES_ENABLED, INTERNAL_ROUTES_TEST_USER } =
      getConfiguration();

    if (!INTERNAL_ROUTES_ENABLED) {
      return handleForbiddenErrorResponse(
        "Internal routes are disabled",
        ErrorSource.BFF,
      );
    }

    const testUser = request.headers.get("X-TEST-USER");

    if (!testUser || !INTERNAL_ROUTES_TEST_USER.includes(testUser)) {
      return handleForbiddenErrorResponse("Invalid Test User", ErrorSource.BFF);
    }

    return handler(request, { testUser });
  };
