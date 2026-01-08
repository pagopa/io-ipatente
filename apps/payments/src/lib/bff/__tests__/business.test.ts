import { DgMotError } from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { Mock, describe, expect, it, vi } from "vitest";

import { retrievePaymentReceipt, retrievePayments } from "../business";
import { getExternalApiClient } from "../client";

vi.mock("../client", () => ({
  getExternalApiClient: vi.fn(),
}));

describe("retrievePayments", () => {
  const mockAdditionalDataJWS = "additional-token";
  const mockToken = "test-token";
  const mockFiscalCode = "ABCDEF12G34H567I";

  it("should return payments information when API call is successful", async () => {
    const mockResponse = { data: "Payments data" };
    const mockGetPagamenti = vi.fn().mockResolvedValue(mockResponse);

    (getExternalApiClient as Mock).mockReturnValue({
      getPagamenti: mockGetPagamenti,
    });

    const result = await retrievePayments(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    expect(result).toEqual(mockResponse);
    expect(mockGetPagamenti).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });

  it("should throw DgMotError when API call fails", async () => {
    const mockError = new Error("API error");
    const mockGetPagamenti = vi.fn().mockRejectedValue(mockError);

    (getExternalApiClient as Mock).mockReturnValue({
      getPagamenti: mockGetPagamenti,
    });

    const result = retrievePayments(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    await expect(result).rejects.toThrow(DgMotError);

    await expect(result).rejects.toThrow(
      "[DG_MOT] Failed to retrieve payments",
    );

    expect(mockGetPagamenti).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });

  it("should throw DgMotError with validation message when ZodiosError failed", async () => {
    const mockZodiosError = new ZodiosError("Validation failed");
    const mockGetPagamenti = vi.fn().mockRejectedValue(mockZodiosError);

    (getExternalApiClient as Mock).mockReturnValue({
      getPagamenti: mockGetPagamenti,
    });

    const result = retrievePayments(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    await expect(result).rejects.toThrow(DgMotError);

    await expect(result).rejects.toThrow(
      "[DG_MOT] Failed zod validation of payments",
    );

    expect(mockGetPagamenti).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });
});

describe("retrievePaymentReceipt", () => {
  const mockAdditionalDataJWS = "additional-token";
  const mockToken = "test-token";
  const mockFiscalCode = "ABCDEF12G34H567I";
  const mockPaymentRequestId = "1234567890";

  it("should return payment receipt when API call is successful", async () => {
    const mockResponse = { data: "Payment receipt data" };
    const mockStampaRicevutaTelematica = vi
      .fn()
      .mockResolvedValue(mockResponse);

    (getExternalApiClient as Mock).mockReturnValue({
      stampaRicevutaTelematica: mockStampaRicevutaTelematica,
    });

    const result = await retrievePaymentReceipt(
      mockAdditionalDataJWS,
      mockToken,
      mockPaymentRequestId,
      mockFiscalCode,
    );

    expect(result).toEqual(mockResponse);
    expect(mockStampaRicevutaTelematica).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
      params: {
        idRichiestaPagamento: mockPaymentRequestId,
      },
    });
  });

  it("should throw DgMotError when API call fails", async () => {
    const mockError = new Error("API error");
    const mockStampaRicevutaTelematica = vi.fn().mockRejectedValue(mockError);

    (getExternalApiClient as Mock).mockReturnValue({
      stampaRicevutaTelematica: mockStampaRicevutaTelematica,
    });

    const result = retrievePaymentReceipt(
      mockAdditionalDataJWS,
      mockToken,
      mockPaymentRequestId,
      mockFiscalCode,
    );

    await expect(result).rejects.toThrow(DgMotError);

    await expect(result).rejects.toThrow(
      "[DG_MOT] Failed to retrieve payment receipt",
    );

    expect(mockStampaRicevutaTelematica).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
      params: {
        idRichiestaPagamento: mockPaymentRequestId,
      },
    });
  });

  it("should throw DgMotError with validation message when ZodiosError failed", async () => {
    const mockZodiosError = new ZodiosError("Validation failed");
    const mockStampaRicevutaTelematica = vi
      .fn()
      .mockRejectedValue(mockZodiosError);

    (getExternalApiClient as Mock).mockReturnValue({
      stampaRicevutaTelematica: mockStampaRicevutaTelematica,
    });

    const result = retrievePaymentReceipt(
      mockAdditionalDataJWS,
      mockToken,
      mockPaymentRequestId,
      mockFiscalCode,
    );

    await expect(result).rejects.toThrow(DgMotError);

    await expect(result).rejects.toThrow(
      "[DG_MOT] Failed zod validation of payment receipt",
    );

    expect(mockStampaRicevutaTelematica).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
      params: {
        idRichiestaPagamento: mockPaymentRequestId,
      },
    });
  });
});
