import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
} from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { Mock, describe, expect, it, vi } from "vitest";

import { Pagamento } from "../../../../generated/bff-openapi";
import { retrievePayments } from "../../../../lib/bff/business";
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
  retrievePayments: vi.fn(),
}));

vi.mock(import("@io-ipatente/core"), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    handleBadRequestErrorResponse: vi.fn(),
    handleInternalErrorResponse: vi.fn(),
    withJWTAuthAndVoucherHandler: (handler) => () =>
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
    (retrievePayments as Mock).mockResolvedValue(mockPayments);

    const response = (await GET(mockRequest, {
      params: {},
    })) as Response;

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(mockPayments);
  });

  it("should handle AxiosError by returning a response with error details", async () => {
    const axiosError = new AxiosError("Network Error");
    axiosError.status = 500;
    (retrievePayments as Mock).mockResolvedValue(axiosError);

    const response = await GET(mockRequest, {});

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      detail: axiosError.message,
      status: axiosError.status,
    });
  });

  it("should handle ZodiosError by invoking handleBadRequestErrorResponse", async () => {
    const zodiosError = new ZodiosError("Bad Request Error");
    (retrievePayments as Mock).mockResolvedValue(zodiosError);

    await GET(mockRequest, {});

    expect(handleBadRequestErrorResponse).toHaveBeenCalledWith(
      zodiosError.message,
    );
  });

  it("should handle generic errors by invoking handleInternalErrorResponse", async () => {
    const error = new Error("Unexpected Error");
    (retrievePayments as Mock).mockRejectedValue(error);

    await GET(mockRequest, {});

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "PaymentsRetrieveError",
      error,
    );
  });
});
