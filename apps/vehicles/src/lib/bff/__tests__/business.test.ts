import { DgMotError } from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { Mock, describe, expect, it, vi } from "vitest";

import { retrieveVehicles } from "../business";
import { getExternalApiClient } from "../client";

// Mock della funzione getExternalApiClient
vi.mock("../client", () => ({
  getExternalApiClient: vi.fn(),
}));

describe("retrieveVehicles", () => {
  const mockAdditionalDataJWS = "additional-token";
  const mockToken = "test-token";
  const mockFiscalCode = "ABCDEF12G34H567I";

  it("should return vehicle information when API call is successful", async () => {
    const mockResponse = { data: "Vehicle data" };
    const mockGetInfoVeicoli = vi.fn().mockResolvedValue(mockResponse);

    (getExternalApiClient as Mock).mockReturnValue({
      getInfoVeicoli: mockGetInfoVeicoli,
    });

    const result = await retrieveVehicles(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    expect(result).toEqual(mockResponse);
    expect(mockGetInfoVeicoli).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });

  it("should throw DgMotError when API call fails", async () => {
    const mockError = new Error("API error");
    const mockGetInfoVeicoli = vi.fn().mockRejectedValue(mockError);

    (getExternalApiClient as Mock).mockReturnValue({
      getInfoVeicoli: mockGetInfoVeicoli,
    });

    const result = retrieveVehicles(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    await expect(result).rejects.toThrow(DgMotError);

    await expect(result).rejects.toThrow(
      "[DG_MOT] Failed to retrieve vehicles",
    );

    expect(mockGetInfoVeicoli).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });

  it("should throw DgMotError with validation message when ZodiosError failed", async () => {
    const mockZodiosError = new ZodiosError("Validation failed");
    const mockGetInfoVeicoli = vi.fn().mockRejectedValue(mockZodiosError);

    (getExternalApiClient as Mock).mockReturnValue({
      getInfoVeicoli: mockGetInfoVeicoli,
    });

    const result = retrieveVehicles(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    await expect(result).rejects.toThrow(DgMotError);

    await expect(result).rejects.toThrow(
      "[DG_MOT] Failed zod validation of vehicles",
    );

    expect(mockGetInfoVeicoli).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });
});
