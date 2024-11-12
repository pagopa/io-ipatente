import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
} from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { Mock, describe, expect, it, vi } from "vitest";

import { Patenti } from "../../../../generated/bff-openapi";
import { retrieveLicences } from "../../../../lib/bff/business";
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
  retrieveLicences: vi.fn(),
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

describe("GET /api/puntiPatente", () => {
  it("should return licences data on success", async () => {
    const mockLicences: Patenti = {
      anagrafica: {
        codiceFiscale: "AAAAAA00A00A000A",
        dataNascita: "1977-10-30",
        descrizioneCognome: "lastName",
        descrizioneNome: "firstName",
        progressivoPosizioneAnagrafica: 12345678,
      },
      datiPatente: [
        {
          dataScadenza: "2016-06-20",
          movPat: [
            {
              codiceVerbale: "aCode",
              dataAttribuzionePunteggio: "2011-07-01",
              dataEmissioneVerbale: "2020-11-10",
              descrizioneAusiliarioAge: "aFullname",
              descrizioneDenominazioneEnteAccertatore: "institutionName",
              descrizioneDenonimazioneEnteAccertatoreEmissione:
                "institutionName",
              descrizioneEventoPunteggio: "event description",
              punteggioEffettuato: 2,
              punteggioNominativo: 2,
              tipoEvento: {
                codice: "0001",
                descrizione: "description",
              },
            },
          ],
          numeroPatente: "PA5254373J",
          saldoPunti: 28,
          tipoCqc: {
            codice: "M",
            descrizione: "description",
          },
        },
      ],
    };
    (retrieveLicences as Mock).mockResolvedValue(mockLicences);

    const response = (await GET(mockRequest, {
      params: {},
    })) as Response;

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(mockLicences);
  });

  it("should handle AxiosError by returning a response with error details", async () => {
    const axiosError = new AxiosError("Network Error");
    axiosError.status = 500;
    (retrieveLicences as Mock).mockResolvedValue(axiosError);

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
    (retrieveLicences as Mock).mockResolvedValue(zodiosError);

    await GET(mockRequest, {});

    expect(handleBadRequestErrorResponse).toHaveBeenCalledWith(
      zodiosError.message,
    );
  });

  it("should handle generic errors by invoking handleInternalErrorResponse", async () => {
    const error = new Error("Unexpected Error");
    (retrieveLicences as Mock).mockRejectedValue(error);

    await GET(mockRequest, {});

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "LicencesRetrieveError",
      error,
    );
  });
});
