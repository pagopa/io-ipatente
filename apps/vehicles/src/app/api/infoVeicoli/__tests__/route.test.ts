import { BffError, handleInternalErrorResponse } from "@io-ipatente/core";
import { NextResponse } from "next/server";
import { Session } from "next-auth";
import { describe, expect, it, vi } from "vitest";

import { Veicolo } from "../../../../generated/bff-openapi";
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
const retrieveVehiclesInnerMock = vi.fn();

vi.mock("../../../../auth", () => ({
  auth: (handler) => () => handler(mockNextAuthRequest, {}),
}));

vi.mock("../../../../lib/bff/business", () => ({
  retrieveVehicles: vi.fn(() => retrieveVehiclesInnerMock),
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
        user: mockSession.user,
        voucher: {
          access_token: "anAccessToken",
          expires_in: 600,
          token_type: "Bearer",
        },
      }),
  };
});

describe("GET /api/vehicles", () => {
  it("should return vehicles data on success", async () => {
    const mockVehicles: Veicolo[] = [
      { targaVeicolo: "FS123EP", tipoVeicolo: "A" },
    ];
    retrieveVehiclesInnerMock.mockResolvedValue(mockVehicles);

    const response = (await GET(mockRequest, {
      params: {},
    })) as Response;

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(mockVehicles);
  });

  it("should handle DgMotError by returning an internal error response", async () => {
    const error = new Error("Failed to retrieve licences");
    retrieveVehiclesInnerMock.mockRejectedValue(error);

    await GET(mockRequest, {});

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "VehiclesRetrieveError",
      error,
    );
  });

  it("should handle zod validation error by invoking handleInternalErrorResponse", async () => {
    // Mock invalid data that will fail Zod validation
    const invalidData = { invalid: "data" };
    retrieveVehiclesInnerMock.mockResolvedValue(invalidData);

    await GET(mockRequest, {});

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "VehiclesRetrieveError",
      expect.any(BffError),
    );
  });

  it("should handle generic errors by invoking handleInternalErrorResponse", async () => {
    const error = new Error("Generic Error");
    retrieveVehiclesInnerMock.mockRejectedValue(error);

    await GET(mockRequest, {});

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "VehiclesRetrieveError",
      error,
    );
  });
});
