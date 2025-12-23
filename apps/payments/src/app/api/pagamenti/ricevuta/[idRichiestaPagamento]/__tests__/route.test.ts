import {
  BffError,
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
} from "@io-ipatente/core";
import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { EsitoStampaTelematica } from "../../../../../../generated/bff-openapi";
import { retrievePaymentReceipt } from "../../../../../../lib/bff/business";
import { GET } from "../route";

const mockSession: Session = {
  expires: "anExpireDate",
  user: {
    familyName: "aFamilyName",
    fiscalCode: "aFiscalCode",
    givenName: "aGivenName",
  },
};

const mockNextAuthRequest = {
  auth: mockSession,
};

const mockRequest = {} as Request;

let mockParams: Record<string, string> = { idRichiestaPagamento: "22" };

vi.mock("../../../../../../auth", () => ({
  auth: (handler) => () => handler(mockNextAuthRequest, {}),
}));

vi.mock("../../../../../../lib/bff/business", () => ({
  retrievePaymentReceipt: vi.fn(),
}));

const retrievePaymentReceiptMock = vi.mocked(retrievePaymentReceipt);

vi.mock(import("@io-ipatente/core"), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    handleBadRequestErrorResponse: vi.fn(),
    handleInternalErrorResponse: vi.fn(),
    withJWTAuthAndVoucherHandler: (_) => (handler) => () =>
      handler(mockRequest, {
        additionalDataJWS: "anAdditional",
        params: mockParams,
        user: mockSession.user,
        voucher: {
          access_token: "anAccessToken",
          expires_in: 600,
          token_type: "Bearer",
        },
      }),
  };
});

describe("GET /api/pagamenti/ricevuta/:idRichiestaPagamento", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockParams = { idRichiestaPagamento: "22" };
  });

  it("should return a payment's receipt", async () => {
    const mockPaymentRecipt: EsitoStampaTelematica = {
      esito: {
        codice: "code",
        descrizione: "description",
      },
      risultato: {
        ext: "pdf",
        file: "filebase64",
        fileName: "nomefile",
      },
    };
    retrievePaymentReceiptMock.mockResolvedValue(mockPaymentRecipt);

    const response = (await GET(mockRequest, {
      params: {
        idRichiestaPagamento: "22",
      },
    })) as Response;

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(mockPaymentRecipt);
  });

  it("should handle DgMotError by returning an internal error response", async () => {
    const error = new Error("Failed to retrieve payment receipt");
    retrievePaymentReceiptMock.mockRejectedValue(error);

    await GET(mockRequest, {
      params: {
        idRichiestaPagamento: "22",
      },
    });

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "PaymentReceiptError",
      error,
    );
  });

  it("should handle zod validation error by invoking handleInternalErrorResponse", async () => {
    // Mock invalid data that will fail Zod validation
    const invalidData = { invalid: "data" };
    retrievePaymentReceiptMock.mockResolvedValue(invalidData);

    await GET(mockRequest, {
      params: {
        idRichiestaPagamento: "22",
      },
    });

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "PaymentReceiptError",
      expect.any(BffError),
    );
  });

  it("should handle generic errors by invoking handleInternalErrorResponse", async () => {
    const error = new Error("Generic Error");
    retrievePaymentReceiptMock.mockRejectedValue(error);

    await GET(mockRequest, {
      params: {
        idRichiestaPagamento: "22",
      },
    });

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "PaymentReceiptError",
      error,
    );
  });

  it("should handle missing parameters by returning bad request", async () => {
    // Set mockParams to empty for testing missing id parameter
    mockParams = {};

    await GET(mockRequest, {
      params: {},
    });

    expect(handleBadRequestErrorResponse).toHaveBeenCalledWith(
      "Missing idRichiestaPagamento param",
    );

    expect(retrievePaymentReceiptMock).not.toHaveBeenCalled();
  });
});
