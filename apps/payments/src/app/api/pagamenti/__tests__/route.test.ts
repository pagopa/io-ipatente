import { BffError, handleInternalErrorResponse } from "@io-ipatente/core";
import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { describe, expect, it, vi } from "vitest";

import { Pagamento } from "../../../../generated/bff-openapi";
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
const retrievePaymentsInnerMock = vi.fn();

vi.mock("../../../../auth", () => ({
  auth: (handler) => () => handler(mockNextAuthRequest, {}),
}));

vi.mock("../../../../lib/bff/business", () => ({
  retrievePayments: vi.fn(() => retrievePaymentsInnerMock),
}));

vi.mock(import("@io-ipatente/core"), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    handleBadRequestErrorResponse: vi.fn(),
    handleInternalErrorResponse: vi.fn(),
    withJWTAuthAndVoucherHandler: (_) => (handler) => () =>
      handler(mockRequest, {
        additionalDataJWS: "anAdditional",
        user: mockSession.user,
        voucher: {
          access_token: "anAccessToken",
          expires_in: 600,
          token_type: "Bearer",
        },
      }),
  };
});

describe("GET /api/payments", () => {
  it("should return payments data on success", async () => {
    const mockPayments: Pagamento[] = [
      {
        dataInserimentoRichiesta: "2024-10-11",
        flagAbbinamento: true,
        flagCumulativo: true,
        flagEsenzione: true,
        flagUrgenza: true,
        idCarrello: 234,
        idRichiesta: 123,
        listaIuv: [],
        numeroPratiche: 3,
        statoPratica: { codice: "A", descrizione: "" },
        tariffario: "ABC",
      },
    ];
    retrievePaymentsInnerMock.mockResolvedValue(mockPayments);

    const response = (await GET(mockRequest, {
      params: {},
    })) as Response;

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(mockPayments);
  });

  it("should handle DgMotError by returning an internal error response", async () => {
    const error = new Error("Failed to retrieve payments");
    retrievePaymentsInnerMock.mockRejectedValue(error);

    await GET(mockRequest, {});

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "PaymentsRetrieveError",
      error,
    );
  });

  it("should handle zod validation error by invoking handleInternalErrorResponse", async () => {
    // Mock invalid data that will fail Zod validation
    const invalidData = { invalid: "data" };
    retrievePaymentsInnerMock.mockResolvedValue(invalidData);

    await GET(mockRequest, {});

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "PaymentsRetrieveError",
      expect.any(BffError),
    );
  });

  it("should handle generic errors by invoking handleInternalErrorResponse", async () => {
    const error = new Error("Generic Error");
    retrievePaymentsInnerMock.mockRejectedValue(error);

    await GET(mockRequest, {});

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "PaymentsRetrieveError",
      error,
    );
  });
});
