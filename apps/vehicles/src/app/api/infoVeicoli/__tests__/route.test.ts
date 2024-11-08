import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
} from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { Mock, describe, expect, it, vi } from "vitest";

import { Veicolo } from "../../../../generated/bff-openapi";
import { retrieveVehicles } from "../../../../lib/bff/business";
import { GET } from "../route";

vi.mock("../../../../auth", () => ({ auth: vi.fn() }));

vi.mock("../../../../lib/bff/business", () => ({
  retrieveVehicles: vi.fn(),
}));

vi.mock("@io-ipatente/core", () => ({
  handleBadRequestErrorResponse: vi.fn(),
  handleInternalErrorResponse: vi.fn(),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  withJWTAuthAndVoucherHandler: (handler: any) => handler,
}));

describe("GET /api/vehicles", () => {
  const mockRequest = {} as NextRequest;

  it("should return vehicles data on success", async () => {
    const mockVehicles: Veicolo[] = [
      { targaVeicolo: "FS123EP", tipoVeicolo: "A" },
    ];
    (retrieveVehicles as Mock).mockResolvedValue(mockVehicles);

    const response = await GET(mockRequest, {
      params: {},
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
      params: {},
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

    await GET(mockRequest, { params: {} });

    expect(handleBadRequestErrorResponse).toHaveBeenCalledWith(
      zodiosError.message,
    );
  });

  it("should handle generic errors by invoking handleInternalErrorResponse", async () => {
    const error = new Error("Unexpected Error");
    (retrieveVehicles as Mock).mockRejectedValue(error);

    await GET(mockRequest, { params: {} });

    expect(handleInternalErrorResponse).toHaveBeenCalledWith(
      "VehiclesRetrieveError",
      error,
    );
  });
});
