import { Voucher } from "@io-ipatente/core";
import { NextRequest, NextResponse } from "next/server";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";

import { CustomUser } from "../../../../types/next-auth";
import { withJWTAuthAndVoucherHandler } from "../with-jwt-auth-voucher-handler";

vi.mock("../with-jwt-auth-handler", () => ({ withJWTAuthHandler }));
vi.mock("../with-voucher-handler", () => ({ withVoucherHandler }));

const { withJWTAuthHandler } = vi.hoisted(() => ({
  withJWTAuthHandler: vi.fn(),
}));

const { withVoucherHandler } = vi.hoisted(() => ({
  withVoucherHandler: vi.fn(),
}));

const mockHandler = vi.fn(async () => NextResponse.json({ success: true }));

const mockUser: CustomUser = {
  familyName: "aFamilyName",
  fiscalCode: "aFiscalCode",
  givenName: "aGivenName",
};
const mockVoucher: Voucher = {
  access_token: "anAccessToken",
  expires_in: 600,
  token_type: "Bearer",
};
const mockNextRequest = {} as NextRequest;
const mockParams = { param1: "value1" };

beforeEach(() => {
  vi.clearAllMocks();
  (withJWTAuthHandler as Mock).mockImplementation(
    (handler) => async (req, context) =>
      handler(req, { ...context, user: mockUser }),
  );
  (withVoucherHandler as Mock).mockImplementation(
    (handler) => async (req, context) =>
      handler(req, { ...context, voucher: mockVoucher }),
  );
});

describe("withJWTAndVoucherHandler", () => {
  it("should call handler with user and voucher context", async () => {
    const response = await withJWTAuthAndVoucherHandler(mockHandler)(
      mockNextRequest,
      {
        params: mockParams,
      },
    );

    expect(mockHandler).toHaveBeenCalledWith(mockNextRequest, {
      params: mockParams,
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

    const response = await withJWTAuthAndVoucherHandler(mockHandler)(
      mockNextRequest,
      {
        params: mockParams,
      },
    );

    expect(mockHandler).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "No Authentication provided",
    });
  });

  it("should handle unauthorized error from withVoucherHandler", async () => {
    (withVoucherHandler as Mock).mockImplementationOnce(
      () => async () =>
        NextResponse.json({ error: "No voucher provided" }, { status: 401 }),
    );

    const response = await withJWTAuthAndVoucherHandler(mockHandler)(
      mockNextRequest,
      {
        params: mockParams,
      },
    );

    expect(mockHandler).not.toHaveBeenCalled();
    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      error: "No voucher provided",
    });
  });

  it("should handle internal error from withVoucherHandler", async () => {
    (withVoucherHandler as Mock).mockImplementationOnce(
      () => async () =>
        NextResponse.json({ error: "VoucherRequestError" }, { status: 500 }),
    );

    const response = await withJWTAuthAndVoucherHandler(mockHandler)(
      mockNextRequest,
      {
        params: mockParams,
      },
    );

    expect(mockHandler).not.toHaveBeenCalled();
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "VoucherRequestError",
    });
  });
});
