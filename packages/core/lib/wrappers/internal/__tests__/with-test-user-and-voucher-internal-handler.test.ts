import { NextRequest, NextResponse } from "next/server";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";

import { Voucher } from "../../../interop/voucher";
import { CoreLogger } from "../../../types/logger";
import { withJWTAuthAndVoucherHandler } from "../../with-jwt-auth-voucher-handler";
import { withTestUserAndVoucherInternalHandler } from "../with-test-user-and-voucher-internal-handler";

type WithJWTAuthAndVoucherHandlerParameters = Parameters<
  ReturnType<ReturnType<typeof withJWTAuthAndVoucherHandler>>
>;

type Context = WithJWTAuthAndVoucherHandlerParameters[1];

const mockVoucherHandlerImplementation = vi.fn();

vi.mock("../with-test-user-internal-handler", () => ({
  withTestUserInternalHandler,
}));
vi.mock("../../with-voucher-handler", () => ({
  withVoucherHandler: vi.fn(() => mockVoucherHandlerImplementation),
}));

const { withTestUserInternalHandler } = vi.hoisted(() => ({
  withTestUserInternalHandler: vi.fn(),
}));

const mockHandler = vi.fn(async () => NextResponse.json({ success: true }));

const mockLogger: CoreLogger = {
  debug: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
};

const mockTestUser = "testUser";
const mockVoucher: Voucher = {
  access_token: "anAccessToken",
  expires_in: 600,
  token_type: "Bearer",
};
const mockAdditionalDataJWS = "anAdditionalDataJWS";

const mockNextRequest = {} as NextRequest;

beforeEach(() => {
  vi.clearAllMocks();
  (withTestUserInternalHandler as Mock).mockImplementation(
    (handler) => async (req: NextRequest) =>
      handler(req, { testUser: mockTestUser }),
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
  it("should call handler with the extracted testUser and voucher context", async () => {
    const response = (await withTestUserAndVoucherInternalHandler(mockLogger)(
      mockHandler,
    )(mockNextRequest)) as Response;

    expect(mockHandler).toHaveBeenCalledWith(mockNextRequest, {
      additionalDataJWS: mockAdditionalDataJWS,
      testUser: mockTestUser,
      voucher: mockVoucher,
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ success: true });
  });

  it("should handle forbidden error from withTestUserInternalHandler", async () => {
    (withTestUserInternalHandler as Mock).mockImplementationOnce(
      () => async () =>
        NextResponse.json(
          { error: "Internal routes are disabled" },
          { status: 403 },
        ),
    );

    const response = (await withTestUserAndVoucherInternalHandler(mockLogger)(
      mockHandler,
    )(mockNextRequest)) as Response;

    expect(mockHandler).not.toHaveBeenCalled();
    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      error: "Internal routes are disabled",
    });
  });

  it("should handle unauthorized error from withVoucherHandler", async () => {
    mockVoucherHandlerImplementation.mockImplementationOnce(
      () => async () =>
        NextResponse.json({ error: "No voucher provided" }, { status: 401 }),
    );

    const response = (await withTestUserAndVoucherInternalHandler(mockLogger)(
      mockHandler,
    )(mockNextRequest)) as Response;

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

    const response = (await withTestUserAndVoucherInternalHandler(mockLogger)(
      mockHandler,
    )(mockNextRequest)) as Response;

    expect(mockHandler).not.toHaveBeenCalled();
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "VoucherRequestError",
    });
  });
});
