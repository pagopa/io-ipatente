import axios from "axios";
import { describe, expect, it, vi } from "vitest";

import { CoreLogger } from "../../types/logger";
import { Voucher, VoucherRequest, requestVoucher } from "../voucher";

vi.mock("axios");

describe("Voucher", () => {
  const mockLogger: CoreLogger = {
    debug: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  };

  const mockVoucher: Voucher = {
    access_token: "test_access_token",
    expires_in: 3600,
    token_type: "Bearer",
  };

  const mockVoucherRequest: VoucherRequest = {
    authServerEndpointUrl: "https://auth.example.com/token",
    data: {
      client_assertion: "eyMockJWS",
      client_assertion_type:
        "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_id: "test_client_id",
      grant_type: "client_credentials",
    },
  };

  it("should send a POST request with the correct data and return a voucher", async () => {
    vi.mocked(axios.post).mockResolvedValueOnce({ data: mockVoucher });

    const result = await requestVoucher()(mockVoucherRequest);

    expect(axios.post).toHaveBeenCalledWith(
      mockVoucherRequest.authServerEndpointUrl,
      expect.any(String), // URLSearchParams check
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    expect(result).toEqual(mockVoucher);
  });

  it("should handle errors and log them", async () => {
    vi.mocked(axios.post).mockRejectedValueOnce(new Error("Network error"));

    const result = await requestVoucher()(mockVoucherRequest);

    expect(result).toBeUndefined();
    expect(mockLogger.error).toHaveBeenCalledWith(
      "An Error has occurred while requesting voucher, caused by: ",
      {
        error: expect.any(Error),
      },
    );
  });

  it("should send the correct URLSearchParams data", async () => {
    const expectedParams = new URLSearchParams({
      client_assertion: "eyMockJWS",
      client_assertion_type:
        "urn:ietf:params:oauth:client-assertion-type:jwt-bearer",
      client_id: "test_client_id",
      grant_type: "client_credentials",
    }).toString();

    vi.mocked(axios.post).mockResolvedValueOnce({ data: mockVoucher });

    await requestVoucher()(mockVoucherRequest);

    expect(axios.post).toHaveBeenCalledWith(
      mockVoucherRequest.authServerEndpointUrl,
      expectedParams,
      expect.any(Object), // headers
    );
  });
});
