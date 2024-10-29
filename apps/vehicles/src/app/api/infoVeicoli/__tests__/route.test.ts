import { Voucher } from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Mock, describe, expect, it, vi } from "vitest";

import { CustomUser } from "../../../../../types/next-auth";
import { Veicolo } from "../../../../generated/openapi";
import { retrieveVehicles } from "../../../../lib/bff/business";
import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
} from "../../../../lib/bff/errors";
import { GET } from "../route";

vi.mock("../../../../auth", () => ({ auth: vi.fn() }));

vi.mock("../../../../lib/bff/business", () => ({
  retrieveVehicles: vi.fn(),
}));

vi.mock("../../../../lib/bff/errors", () => ({
  handleBadRequestErrorResponse: vi.fn(),
  handleInternalErrorResponse: vi.fn(),
}));

vi.mock("../../../../lib/bff/with-jwt-auth-voucher-handler", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  withJWTAuthAndVoucherHandler: (handler: any) => handler,
}));

describe("GET /api/vehicles", () => {
  const mockUser: CustomUser = { fiscalCode: "ABCDEF12G34H567I" };
  const mockVoucher: Voucher = {
    access_token: "test-token",
    expires_in: 600,
    token_type: "Bearer",
  };

  const mockRequest = {} as NextRequest;

  it("should return vehicles data on success", async () => {
    const mockVehicles: Veicolo[] = [
      { targaVeicolo: "FS123EP", tipoVeicolo: "A" },
    ];
    (retrieveVehicles as Mock).mockResolvedValue(mockVehicles);

    const response = await GET(mockRequest, {
      user: mockUser,
      voucher: mockVoucher,
    });

    expect(response).toBeInstanceOf(NextResponse);
    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual(mockVehicles);
  });

  it("should handle AxiosError by returning a response with error details", async () => {
    const axiosError = new AxiosError("Network Error");
    axiosError.status = 500;
    (retrieveVehicles as Mock).mockResolvedValue(axiosError);

    const response = await GET(mockRequest, {
      user: mockUser,
      voucher: mockVoucher,
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
    (retrieveVehicles as Mock).mockResolvedValue(zodiosError);

    await GET(mockRequest, { user: mockUser, voucher: mockVoucher });

    expect(handleBadRequestErrorResponse).toHaveBeenCalledWith(
      zodiosError.message,
    );
  });

  it("should handle generic errors by invoking handleInternalErrorResponse", async () => {
    const error = new Error("Unexpected Error");
    (retrieveVehicles as Mock).mockRejectedValue(error);

    await GET(mockRequest, { user: mockUser, voucher: mockVoucher });

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "VehiclesRetrieveError",
      error,
    );
  });
});
