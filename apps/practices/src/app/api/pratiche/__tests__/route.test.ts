import { BffError, handleInternalErrorResponse } from "@io-ipatente/core";
import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { describe, expect, it, vi } from "vitest";

import { Pratica } from "../../../../generated/bff-openapi";
import { retrievePractices } from "../../../../lib/bff/business";
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

vi.mock("../../../../auth", () => ({
  auth: (handler) => () => handler(mockNextAuthRequest, {}),
}));

vi.mock("../../../../lib/bff/business", () => ({
  retrievePractices: vi.fn(),
}));

const retrievePracticesMock = vi.mocked(retrievePractices);

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

describe("GET /api/practices", () => {
  it("should return practices data on success", async () => {
    const mockPractices: Pratica[] = [
      {
        dataApertura: "2024-10-10",
        numeroPratica: 123,
        statoPratica: "status",
        tipoPratica: { codice: "AX", descrizione: "description" },
      },
    ];
    retrievePracticesMock.mockResolvedValue(mockPractices);

    const response = (await GET(mockRequest, {
      params: {},
    })) as Response;

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(mockPractices);
  });

  it("should handle DgMotError by returning an internal error response", async () => {
    const error = new Error("Failed to retrieve practices");
    retrievePracticesMock.mockRejectedValue(error);

    await GET(mockRequest, {});

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "PracticesRetrieveError",
      error,
    );
  });

  it("should handle zod validation error by invoking handleInternalErrorResponse", async () => {
    // Mock invalid data that will fail Zod validation
    const invalidData = { invalid: "data" };
    retrievePracticesMock.mockResolvedValue(invalidData);

    await GET(mockRequest, {});

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "PracticesRetrieveError",
      expect.any(BffError),
    );
  });

  it("should handle generic errors by invoking handleInternalErrorResponse", async () => {
    const error = new Error("Generic Error");
    retrievePracticesMock.mockRejectedValue(error);

    await GET(mockRequest, {});

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "PracticesRetrieveError",
      error,
    );
  });
});
