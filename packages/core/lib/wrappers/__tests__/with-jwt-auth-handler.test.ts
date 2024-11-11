import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { describe, expect, it, vi } from "vitest";

import { HTTP_STATUS_UNAUTHORIZED } from "../../utils/constants";
import { handleUnauthorizedErrorResponse } from "../../utils/errors";
import { withJWTAuthHandler } from "../with-jwt-auth-handler";

// Mock delle dipendenze
vi.mock("next-auth", () => ({
  default: vi.fn(),
}));

vi.mock("../../utils/errors", async () => {
  const actual =
    await vi.importActual<typeof import("../../utils/errors")>(
      "../../utils/errors",
    );
  return {
    ...actual,
    handleUnauthorizedErrorResponse: vi.fn(() =>
      NextResponse.json({}, { status: HTTP_STATUS_UNAUTHORIZED }),
    ),
  };
});

describe("withJWTAuthHandler", () => {
  it("should return unauthorized error response if no session is provided", async () => {
    // TODO: fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockNextAuthRequest: any = {};
    const mockContext = {};

    const mockHandler = vi.fn();

    await withJWTAuthHandler(mockHandler)(mockNextAuthRequest, mockContext);

    // Verifica che handleUnauthorizedErrorResponse venga chiamato
    expect(handleUnauthorizedErrorResponse).toHaveBeenCalledWith(
      "No Authentication provided",
    );
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it("should call handler with request, params, and user when session is provided", async () => {
    const mockSession: Session = {
      expires: "anExpireDate",
      user: {
        familyName: "aFamilyName",
        fiscalCode: "aFiscalCode",
        givenName: "aGivenName",
      },
    };
    // TODO: fix type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mockNextAuthRequest: any = {
      auth: mockSession,
    };
    const mockContext = {};

    const mockHandler = vi
      .fn()
      .mockResolvedValue(NextResponse.json({ success: true }));

    const response = (await withJWTAuthHandler(mockHandler)(
      mockNextAuthRequest,
      mockContext,
    )) as Response;

    expect(mockHandler).toHaveBeenCalledWith(mockNextAuthRequest, {
      user: mockSession.user,
    });
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({ success: true });
  });
});