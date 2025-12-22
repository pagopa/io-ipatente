import { DgMotError } from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { Mock, describe, expect, it, vi } from "vitest";

import { retrieveLicences } from "../business";
import { getExternalApiClient } from "../client";

vi.mock("../client", () => ({
  getExternalApiClient: vi.fn(),
}));

describe("retrieveLicences", () => {
  const mockAdditionalDataJWS = "additional-token";
  const mockToken = "test-token";
  const mockFiscalCode = "ABCDEF12G34H567I";

  it("should return licences information when API call is successful", async () => {
    const mockResponse = { data: "Licences data" };
    const mockGetPuntiPatente = vi.fn().mockResolvedValue(mockResponse);

    (getExternalApiClient as Mock).mockReturnValue({
      getPuntiPatente: mockGetPuntiPatente,
    });

    const result = await retrieveLicences()(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    expect(result).toEqual(mockResponse);
    expect(mockGetPuntiPatente).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });

  it("should throw DgMotError when API call fails", async () => {
    const mockError = new Error("API error");
    const mockGetPuntiPatente = vi.fn().mockRejectedValue(mockError);

    (getExternalApiClient as Mock).mockReturnValue({
      getPuntiPatente: mockGetPuntiPatente,
    });

    const result = retrieveLicences()(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    await expect(result).rejects.toThrow(DgMotError);

    await expect(result).rejects.toThrow(
      "[DG_MOT] Failed to retrieve licences",
    );

    expect(mockGetPuntiPatente).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });

  it("should throw DgMotError with validation message when ZodiosError failed", async () => {
    const mockZodiosError = new ZodiosError("Validation failed");
    const mockGetPuntiPatente = vi.fn().mockRejectedValue(mockZodiosError);

    (getExternalApiClient as Mock).mockReturnValue({
      getPuntiPatente: mockGetPuntiPatente,
    });

    const result = retrieveLicences()(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    await expect(result).rejects.toThrow(DgMotError);

    await expect(result).rejects.toThrow(
      "[DG_MOT] Failed zod validation of licences",
    );

    expect(mockGetPuntiPatente).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });
});
