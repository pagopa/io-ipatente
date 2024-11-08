import { NextRequest, NextResponse } from "next/server";
import NextAuth, { Session } from "next-auth";
import { Mock, describe, expect, it, vi } from "vitest";

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

const localhostUrl = "http://localhost";

describe("withJWTAuthHandler", () => {
  it("should return unauthorized error response if no session is provided", async () => {
    // Mock della funzione auth di NextAuth per restituire una sessione nulla
    const mockAuth = vi.fn().mockResolvedValue(null);
    (NextAuth as unknown as Mock).mockReturnValue({ auth: mockAuth });

    const mockHandler = vi.fn();
    const request = new NextRequest(new URL(localhostUrl));
    const context = { params: {} };

    // Chiama il wrapper
    await withJWTAuthHandler(mockHandler)(request, context);

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
    const mockAuth = vi.fn().mockResolvedValue(mockSession);
    (NextAuth as unknown as Mock).mockReturnValue({ auth: mockAuth });

    const mockHandler = vi
      .fn()
      .mockResolvedValue(NextResponse.json({ success: true }));
    const request = new NextRequest(new URL(localhostUrl));
    const context = { params: { id: 123 } };

    // Chiama il wrapper
    const response = await withJWTAuthHandler(mockHandler)(request, context);

    // Verifica che il mockHandler venga chiamato con i parametri corretti
    expect(mockHandler).toHaveBeenCalledWith(request, {
      params: context.params,
      user: mockSession.user,
    });
    const jsonResponse = await response.json();
    expect(jsonResponse).toEqual({ success: true });
  });
});
