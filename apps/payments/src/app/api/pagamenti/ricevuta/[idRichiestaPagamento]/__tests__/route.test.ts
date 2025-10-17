import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
} from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { Mock, describe, expect, it, vi } from "vitest";

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

vi.mock("../../../../../../auth", () => ({
  auth: (handler) => () => handler(mockNextAuthRequest, {}),
}));

vi.mock("../../../../../../lib/bff/business", () => ({
  retrievePaymentReceipt: vi.fn(),
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
        params: {
          idRichiestaPagamento: "22",
        },
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
  it("should return a payment's recipt", async () => {
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
    (retrievePaymentReceipt as Mock).mockResolvedValue(mockPaymentRecipt);

    const response = (await GET(mockRequest, {
      params: {
        idRichiestaPagamento: "22",
      },
    })) as Response;

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(mockPaymentRecipt);
  });
  it("should handle AxiosError by returning a response with error details", async () => {
    const axiosError = new AxiosError("Network Error");
    axiosError.status = 500;
    (retrievePaymentReceipt as Mock).mockResolvedValue(axiosError);

    const response = await GET(mockRequest, {
      params: {
        idRichiestaPagamento: "22",
      },
    });

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      detail: axiosError.message,
      status: axiosError.status,
    });
  });

  it("should handle ZodiosError by invoking handleBadRequestErrorResponse", async () => {
    const zodiosError = new ZodiosError("Bad Request Error");
    (retrievePaymentReceipt as Mock).mockResolvedValue(zodiosError);

    await GET(mockRequest, {
      params: {
        idRichiestaPagamento: "22",
      },
    });

    expect(handleBadRequestErrorResponse).toHaveBeenCalledWith(
      zodiosError.message,
    );
  });

  it("should handle generic errors by invoking handleInternalErrorResponse", async () => {
    const error = new Error("Unexpected Error");
    (retrievePaymentReceipt as Mock).mockRejectedValue(error);

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

  it("should handle generic errors for missing parameters", async () => {
    const zodiosError = new ZodiosError("Missing idRichiestaPagamento param");
    (retrievePaymentReceipt as Mock).mockResolvedValue(zodiosError);

    await GET(mockRequest, {
      params: {},
    });

    expect(handleBadRequestErrorResponse).toHaveBeenCalledWith(
      zodiosError.message,
    );
  });
});
