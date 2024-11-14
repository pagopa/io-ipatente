import { NextRequest, NextResponse } from "next/server";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_OK,
  HTTP_STATUS_UNAUTHORIZED,
} from "../../../utils/constants";
import { withTestUserInternalHandler } from "../with-test-user-internal-handler";

const { getConfiguration } = vi.hoisted(() => ({
  getConfiguration: vi.fn().mockReturnValue({
    INTERNAL_ROUTES_ENABLED: false,
    INTERNAL_ROUTES_TEST_USER: ["testUser"],
  }),
}));

vi.mock("../../../config", async () => {
  const actual = await vi.importActual("../../../config");
  return {
    ...actual,
    getConfiguration,
  };
});

vi.mock("../../../utils/errors", async () => {
  const actual = await vi.importActual<typeof import("../../../utils/errors")>(
    "../../../utils/errors",
  );
  return {
    ...actual,
    handleForbiddenErrorResponse: vi.fn(() =>
      NextResponse.json({}, { status: HTTP_STATUS_FORBIDDEN }),
    ),
  };
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("withTestUserInternalHandler", () => {
  const mockHandler = vi
    .fn()
    .mockResolvedValue(NextResponse.json({ success: true }));

  it("should not call handler when internal routes are disabled", async () => {
    const request = {
      headers: {
        get: vi.fn(() => "testUser"),
      },
    } as unknown as NextRequest;

    const resp = await withTestUserInternalHandler(mockHandler)(request);

    // eslint-disable-next-line no-console
    expect(resp.status).toBe(HTTP_STATUS_FORBIDDEN);
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it("should not call handler when testUser is not allowed to be used", async () => {
    const request = {
      headers: {
        get: vi.fn(() => "wrongTestUser"),
      },
    } as unknown as NextRequest;

    const resp = await withTestUserInternalHandler(mockHandler)(request);

    // eslint-disable-next-line no-console
    expect(resp.status).toBe(HTTP_STATUS_FORBIDDEN);
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it("should call handler responde OK when internal routes are enabled and the testUser is allowed", async () => {
    const request = {
      headers: {
        get: vi.fn(() => "testUser"),
      },
    } as unknown as NextRequest;

    getConfiguration.mockReturnValueOnce({
      INTERNAL_ROUTES_ENABLED: true,
      INTERNAL_ROUTES_TEST_USER: ["testUser"],
    });

    const resp = await withTestUserInternalHandler(mockHandler)(request);

    // eslint-disable-next-line no-console
    expect(resp.status).toBe(HTTP_STATUS_OK);
    expect(mockHandler).toHaveBeenCalledWith(request, {
      testUser: "testUser",
    });
  });
});
