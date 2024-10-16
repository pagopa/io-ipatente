import { NextRequest, NextResponse } from "next/server";
import { User } from "next-auth";
import { describe, expect, it, vi } from "vitest";

import { withJWTAuthHandler } from "../wrappers";

const localhostUrl = "http://localhost";

const mocks: {
  jwtMock: User;
} = vi.hoisted(() => ({
  jwtMock: {
    familyName: "aFamilyName",
    fiscalCode: "aFiscalCode",
    givenName: "aGivenName",
  } as unknown as User,
}));

const { getToken } = vi.hoisted(() => ({
  getToken: vi.fn().mockReturnValue(() => Promise.resolve(mocks.jwtMock)),
}));

vi.mock("next-auth/jwt", async () => {
  const actual = await vi.importActual("next-auth/jwt");
  return {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...(actual as any),
    getToken,
  };
});

describe("withJWTAuthHandler", () => {
  it("no token or invalid one provided should end up in 401 response", async () => {
    getToken.mockReturnValueOnce(Promise.resolve(null));

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
    getToken.mockReturnValueOnce(Promise.resolve(mocks.jwtMock));

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
        user: mocks.jwtMock,
      }),
    );
    expect(result.status).toBe(200);
  });
});
