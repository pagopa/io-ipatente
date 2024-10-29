import { NextRequest, NextResponse } from "next/server";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";

import {
  Voucher,
  generateClientAssertion,
  requestVoucher,
} from "../../../../../../packages/core";
import {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_UNAUTHORIZED,
} from "../constants";
import {
  handleInternalErrorResponse,
  handleUnauthorizedErrorResponse,
} from "../errors";
import { withVoucherHandler } from "../with-voucher-handler";

vi.mock("../../../config", () => ({
  getConfiguration: vi.fn(() => ({
    INTEROP_AUTH_SERVER_ENDPOINT_URL: "https://auth-server.com",
    INTEROP_CLIENT_ASSERTION_AUD: "audience",
    INTEROP_CLIENT_ASSERTION_ISS: "issuer",
    INTEROP_CLIENT_ASSERTION_KID: "kid",
    INTEROP_CLIENT_ASSERTION_PK: "privateKey",
    INTEROP_CLIENT_ASSERTION_PURPOSE_ID: "purposeId",
    INTEROP_CLIENT_ASSERTION_SUB: "subject",
    INTEROP_CLIENT_ASSERTION_TYPE: "assertionType",
    INTEROP_CLIENT_ID: "clientId",
    INTEROP_GRANT_TYPE: "grantType",
  })),
}));

vi.mock("@io-ipatente/core", async () => {
  const actual =
    await vi.importActual<typeof import("../../../../../../packages/core")>(
      "@io-ipatente/core",
    );
  return {
    ...actual,
    generateClientAssertion: vi.fn(),
    requestVoucher: vi.fn(),
  };
});

vi.mock("../errors", async () => {
  const actual = await vi.importActual<typeof import("../errors")>("../errors");
  return {
    ...actual,
    handleInternalErrorResponse: vi.fn(() =>
      NextResponse.json({}, { status: HTTP_STATUS_INTERNAL_SERVER_ERROR }),
    ),
    handleUnauthorizedErrorResponse: vi.fn(() =>
      NextResponse.json({}, { status: HTTP_STATUS_UNAUTHORIZED }),
    ),
  };
});

describe("withVoucherHandler", () => {
  let handlerMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handlerMock = vi.fn();
    vi.clearAllMocks();
  });

  it("should call handler with voucher on success", async () => {
    // Mock valori di successo
    const mockAssertion = "mockClientAssertion";
    const mockVoucher: Voucher = {
      access_token: "anAccessToken",
      expires_in: 600,
      token_type: "Bearer",
    };

    (generateClientAssertion as Mock).mockReturnValue(mockAssertion);
    (requestVoucher as Mock).mockResolvedValue(mockVoucher);

    const request = {} as NextRequest;
    const params = { param1: "value1" };

    await withVoucherHandler(handlerMock)(request, { params });

    expect(generateClientAssertion).toHaveBeenCalledOnce();
    expect(requestVoucher).toHaveBeenCalledWith({
      authServerEndpointUrl: "https://auth-server.com",
      data: {
        client_assertion: mockAssertion,
        client_assertion_type: "assertionType",
        client_id: "clientId",
        grant_type: "grantType",
      },
    });
    expect(handlerMock).toHaveBeenCalledWith(request, {
      params,
      voucher: mockVoucher,
    });
  });

  it("should return unauthorized response if client assertion is missing", async () => {
    (generateClientAssertion as Mock).mockReturnValue(null);

    const request = {} as NextRequest;
    const params = { param1: "value1" };

    await withVoucherHandler(handlerMock)(request, { params });

    expect(handleUnauthorizedErrorResponse).toHaveBeenCalledWith(
      "No client assertion provided",
    );
    expect(handlerMock).not.toHaveBeenCalled();
  });

  it("should return unauthorized response if voucher is missing", async () => {
    (generateClientAssertion as Mock).mockReturnValue("mockClientAssertion");
    (requestVoucher as Mock).mockResolvedValue(null);

    const request = {} as NextRequest;
    const params = { param1: "value1" };

    await withVoucherHandler(handlerMock)(request, { params });

    expect(handleUnauthorizedErrorResponse).toHaveBeenCalledWith(
      "No voucher provided",
    );
    expect(handlerMock).not.toHaveBeenCalled();
  });

  it("should return internal error response on exception", async () => {
    (generateClientAssertion as Mock).mockImplementation(() => {
      throw new Error("Assertion error");
    });

    const request = {} as NextRequest;
    const params = { param1: "value1" };

    await withVoucherHandler(handlerMock)(request, { params });

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "VoucherRequestError",
      expect.any(Error),
    );
    expect(handlerMock).not.toHaveBeenCalled();
  });
});
