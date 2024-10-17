import { NextRequest, NextResponse } from "next/server";
import { Session } from "next-auth";
import { describe, expect, it, vi } from "vitest";

import { withJWTAuthHandler } from "../wrappers";

const localhostUrl = "http://localhost";

const mockSession: Session = vi.hoisted(() => ({
  expires: "anExpireDate",
  user: {
    familyName: "aFamilyName",
    fiscalCode: "aFiscalCode",
    givenName: "aGivenName",
  },
}));

const { auth } = vi.hoisted(() => ({
  auth: vi.fn().mockReturnValue(() => Promise.resolve(mockSession)),
}));

vi.mock("../../../auth", () => ({ auth }));

describe("withJWTAuthHandler", () => {
  it("no token or invalid one provided should end up in 401 response", async () => {
    auth.mockReturnValueOnce(Promise.resolve(null));

    const nextRequestMock = new NextRequest(new URL(localhostUrl));

    const aMockedHandler = vi.fn(() =>
      Promise.resolve(NextResponse.json({}, { status: 200 })),
    );

    const result = await withJWTAuthHandler(aMockedHandler)(nextRequestMock, {
      params: {},
    });

    expect(aMockedHandler).not.toHaveBeenCalled();
    expect(result.status).toBe(401);
  });

  it("valid token provided should end up in 200 response", async () => {
    auth.mockResolvedValueOnce(Promise.resolve(mockSession));

    const nextRequestMock = new NextRequest(new URL(localhostUrl));

    const aMockedHandler = vi.fn(() =>
      Promise.resolve(NextResponse.json({}, { status: 200 })),
    );

    const result = await withJWTAuthHandler(aMockedHandler)(nextRequestMock, {
      params: {},
    });

    expect(aMockedHandler).toHaveBeenCalledWith(
      nextRequestMock,
      expect.objectContaining({
        params: {},
        user: mockSession.user,
      }),
    );
    expect(result.status).toBe(200);
  });
});
