import { NextRequest, NextResponse } from "next/server";
import { User } from "next-auth";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";

import { Voucher } from "../../interop/voucher";
import { CoreLogger } from "../../types/logger";
import { withJWTAuthAndVoucherHandler } from "../with-jwt-auth-voucher-handler";

type WithJWTAuthAndVoucherHandlerParameters = Parameters<
  ReturnType<ReturnType<typeof withJWTAuthAndVoucherHandler>>
>;

type NextAuthRequest = WithJWTAuthAndVoucherHandlerParameters[0];
type Context = WithJWTAuthAndVoucherHandlerParameters[1];

const mockVoucherHandlerImplementation = vi.fn();

vi.mock("../with-jwt-auth-handler", () => ({ withJWTAuthHandler }));
vi.mock("../with-voucher-handler", () => ({
  withVoucherHandler: vi.fn(() => mockVoucherHandlerImplementation),
}));

const { withJWTAuthHandler } = vi.hoisted(() => ({
  withJWTAuthHandler: vi.fn(),
}));

const mockHandler = vi.fn(async () => NextResponse.json({ success: true }));

const mockLogger: CoreLogger = {
  debug: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
};

const mockUser: User = {
  familyName: "aFamilyName",
  fiscalCode: "aFiscalCode",
  givenName: "aGivenName",
};
const mockVoucher: Voucher = {
  access_token: "anAccessToken",
  expires_in: 600,
  token_type: "Bearer",
};
const mockAdditionalDataJWS = "anAdditionalDataJWS";

const mockNextRequest = {} as NextAuthRequest;

beforeEach(() => {
  vi.clearAllMocks();
  (withJWTAuthHandler as Mock).mockImplementation(
    (handler) => async (req: NextRequest, context: Context) =>
      handler(req, { ...context, user: mockUser }),
  );
  mockVoucherHandlerImplementation.mockImplementation(
    (handler) => async (req: NextRequest, context: Context) =>
      handler(req, {
        ...context,
        additionalDataJWS: mockAdditionalDataJWS,
        voucher: mockVoucher,
      }),
  );
});

describe("withJWTAndVoucherHandler", () => {
  it("should call handler with user and voucher context", async () => {
    const response = (await withJWTAuthAndVoucherHandler(mockLogger)(
      mockHandler,
    )(mockNextRequest, {})) as Response;

    expect(mockHandler).toHaveBeenCalledWith(mockNextRequest, {
      additionalDataJWS: mockAdditionalDataJWS,
      user: mockUser,
      voucher: mockVoucher,
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("should handle unauthorized error from withJWTAuthHandler", async () => {
    (withJWTAuthHandler as Mock).mockImplementationOnce(
      () => async () =>
        NextResponse.json(
          { error: "No Authentication provided" },
          { status: 401 },
        ),
    );

    const response = (await withJWTAuthAndVoucherHandler(mockLogger)(
      mockHandler,
    )(mockNextRequest, {})) as Response;

    expect(mockHandler).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "No Authentication provided",
    });
  });

  it("should handle unauthorized error from withVoucherHandler", async () => {
    mockVoucherHandlerImplementation.mockImplementationOnce(
      () => async () =>
        NextResponse.json({ error: "No voucher provided" }, { status: 401 }),
    );

    const response = (await withJWTAuthAndVoucherHandler(mockLogger)(
      mockHandler,
    )(mockNextRequest, {})) as Response;

    expect(mockHandler).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "No voucher provided",
    });
  });

  it("should handle internal error from withVoucherHandler", async () => {
    mockVoucherHandlerImplementation.mockImplementationOnce(
      () => async () =>
        NextResponse.json({ error: "VoucherRequestError" }, { status: 500 }),
    );

    const response = (await withJWTAuthAndVoucherHandler(mockLogger)(
      mockHandler,
    )(mockNextRequest, {})) as Response;

    expect(mockHandler).not.toHaveBeenCalled();
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "VoucherRequestError",
    });
  });
});
