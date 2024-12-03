import { NextRequest, NextResponse } from "next/server";
import { User } from "next-auth";
import { Mock, beforeEach, describe, expect, it, vi } from "vitest";

import { generateClientAssertion } from "../../interop/client-assertion";
import { Voucher, requestVoucher } from "../../interop/voucher";
import {
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_UNAUTHORIZED,
} from "../../utils/constants";
import {
  handleInternalErrorResponse,
  handleUnauthorizedErrorResponse,
} from "../../utils/errors";
import { withVoucherHandler } from "../with-voucher-handler";

const mockUser: User = {
  familyName: "aFamilyName",
  fiscalCode: "aFiscalCode",
  givenName: "aGivenName",
};

const mockContext = {
  user: mockUser,
};

vi.mock(import("../../config"), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    getConfiguration: vi.fn().mockReturnValue({
      INTEROP_AUTH_SERVER_ENDPOINT_URL: "https://auth-server.com",
      INTEROP_CLIENT_ASSERTION_AUD: "audience",
      INTEROP_CLIENT_ASSERTION_ISS: "issuer",
      INTEROP_CLIENT_ASSERTION_KID: "kid",
      INTEROP_CLIENT_ASSERTION_PK: "privateKey",
      INTEROP_CLIENT_ASSERTION_PURPOSE_ID: "purposeId",
      INTEROP_CLIENT_ASSERTION_SUB: "subject",
      INTEROP_CLIENT_ASSERTION_TYPE: "assertionType",
      INTEROP_CLIENT_ID: "clientId",
      INTEROP_ESERVICE_AUDIENCE: "eServiceAudience",
      INTEROP_GRANT_TYPE: "grantType",
    }),
  };
});

vi.mock(import("../../interop/client-assertion"), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    generateClientAssertion: vi.fn(),
  };
});

vi.mock(import("../../interop/voucher"), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    requestVoucher: vi.fn(),
  };
});

vi.mock("../../utils/errors", async () => {
  const actual =
    await vi.importActual<typeof import("../../utils/errors")>(
      "../../utils/errors",
    );
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

const mockFiscalCode = "ABCDEF12G34H567I";
const mockAssertion = "mockClientAssertion";
const mockAdditionalDataJWS = "anAdditionalDataJWS";
const mockVoucher: Voucher = {
  access_token: "anAccessToken",
  expires_in: 600,
  token_type: "Bearer",
};

describe("withVoucherHandler", () => {
  let handlerMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    handlerMock = vi.fn();
    vi.clearAllMocks();
  });

  it("should call handler with voucher on success", async () => {
    (generateClientAssertion as Mock).mockReturnValue({
      additionalDataJWS: mockAdditionalDataJWS,
      clientAssertionJWS: mockAssertion,
    });
    (requestVoucher as Mock).mockResolvedValue(mockVoucher);

    const request = {} as NextRequest;

    await withVoucherHandler(handlerMock, mockFiscalCode)(request, mockContext);

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
      additionalDataJWS: mockAdditionalDataJWS,
      user: mockUser,
      voucher: mockVoucher,
    });
  });

  it("should return unauthorized response if client assertion is missing", async () => {
    (generateClientAssertion as Mock).mockReturnValue(null);

    const request = {} as NextRequest;

    await withVoucherHandler(handlerMock, mockFiscalCode)(request, mockContext);

    expect(handleUnauthorizedErrorResponse).toHaveBeenCalledWith(
      "No client assertion provided",
    );
    expect(handlerMock).not.toHaveBeenCalled();
  });

  it("should return unauthorized response if voucher is missing", async () => {
    (generateClientAssertion as Mock).mockReturnValue({
      additionalDataJWS: mockAdditionalDataJWS,
      clientAssertionJWS: mockAssertion,
    });
    (requestVoucher as Mock).mockResolvedValue(null);

    const request = {} as NextRequest;

    await withVoucherHandler(handlerMock, mockFiscalCode)(request, mockContext);

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

    await withVoucherHandler(handlerMock, mockFiscalCode)(request, mockContext);

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "VoucherRequestError",
      expect.any(Error),
    );
    expect(handlerMock).not.toHaveBeenCalled();
  });
});
