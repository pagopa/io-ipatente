import { Mock, describe, expect, it, vi } from "vitest";

import { retrieveVehicles } from "../business";
import { getExternalApiClient } from "../client";

// Mock della funzione getExternalApiClient
vi.mock("../client", () => ({
  getExternalApiClient: vi.fn(),
}));

describe("retrieveVehicles", () => {
  const mockToken = "test-token";
  const mockFiscalCode = "ABCDEF12G34H567I";

  it("should return vehicle information when API call is successful", async () => {
    const mockResponse = { data: "Vehicle data" };
    const mockGetInfoVeicoli = vi.fn().mockResolvedValue(mockResponse);

    (getExternalApiClient as Mock).mockReturnValue({
      getInfoVeicoli: mockGetInfoVeicoli,
    });

    const result = await retrieveVehicles(mockToken, mockFiscalCode);

    expect(result).toEqual(mockResponse);
    expect(mockGetInfoVeicoli).toHaveBeenCalledWith({
      headers: {
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });

  it("should return an error when API call fails", async () => {
    const mockError = new Error("API error");
    const mockGetInfoVeicoli = vi.fn().mockRejectedValue(mockError);

    (getExternalApiClient as Mock).mockReturnValue({
      getInfoVeicoli: mockGetInfoVeicoli,
    });

    const result = await retrieveVehicles(mockToken, mockFiscalCode);

    expect(result).toBe(mockError);
    expect(mockGetInfoVeicoli).toHaveBeenCalledWith({
      headers: {
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });
});
