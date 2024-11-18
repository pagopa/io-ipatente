import { Mock, describe, expect, it, vi } from "vitest";

import { retrievePayments } from "../business";
import { getExternalApiClient } from "../client";

// Mock della funzione getExternalApiClient
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

  it("should return an error when API call fails", async () => {
    const mockError = new Error("API error");
    const mockGetPagamenti = vi.fn().mockRejectedValue(mockError);

    (getExternalApiClient as Mock).mockReturnValue({
      getPagamenti: mockGetPagamenti,
    });

    const result = await retrievePayments(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    expect(result).toBe(mockError);
    expect(mockGetPagamenti).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });
});
