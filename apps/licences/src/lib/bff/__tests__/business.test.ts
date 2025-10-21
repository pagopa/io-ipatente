import { CoreLogger } from "@io-ipatente/core";
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
  const mockLogger: CoreLogger = {
    debug: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  };

  it("should return licences information when API call is successful", async () => {
    const mockResponse = { data: "Licences data" };
    const mockGetPuntiPatente = vi.fn().mockResolvedValue(mockResponse);

    (getExternalApiClient as Mock).mockReturnValue({
      getPuntiPatente: mockGetPuntiPatente,
    });

    const result = await retrieveLicences(mockLogger)(
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

  it("should return an error when API call fails", async () => {
    const mockError = new Error("API error");
    const mockGetPuntiPatente = vi.fn().mockRejectedValue(mockError);

    (getExternalApiClient as Mock).mockReturnValue({
      getPuntiPatente: mockGetPuntiPatente,
    });

    const result = await retrieveLicences(mockLogger)(
      mockAdditionalDataJWS,
      mockToken,
      mockFiscalCode,
    );

    expect(result).toBe(mockError);
    expect(mockGetPuntiPatente).toHaveBeenCalledWith({
      headers: {
        "Agid-JWT-TrackingEvidence": mockAdditionalDataJWS,
        Authorization: `Bearer ${mockToken}`,
        codiceFiscale: mockFiscalCode,
      },
    });
  });
});
