import { Mock, describe, expect, it, vi } from "vitest";

import { retrievePractices } from "../business";
import { getExternalApiClient } from "../client";

// Mock della funzione getExternalApiClient
vi.mock("../client", () => ({
  getExternalApiClient: vi.fn(),
}));

describe("retrievePractices", () => {
  const mockAdditionalDataJWS = "additional-token";
  const mockToken = "test-token";
  const mockFiscalCode = "ABCDEF12G34H567I";

  it("should return practice information when API call is successful", async () => {
    const mockResponse = { data: "Practice data" };
    const mockGetPratiche = vi.fn().mockResolvedValue(mockResponse);

    (getExternalApiClient as Mock).mockReturnValue({
      getPratiche: mockGetPratiche,
    });

    const result = await retrievePractices(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    expect(result).toEqual(mockResponse);
    expect(mockGetPratiche).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });

  it("should return an error when API call fails", async () => {
    const mockError = new Error("API error");
    const mockGetPratiche = vi.fn().mockRejectedValue(mockError);

    (getExternalApiClient as Mock).mockReturnValue({
      getPratiche: mockGetPratiche,
    });

    const result = await retrievePractices(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    expect(result).toBe(mockError);
    expect(mockGetPratiche).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });
});
