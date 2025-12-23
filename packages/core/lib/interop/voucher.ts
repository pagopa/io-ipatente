import axios, { AxiosError } from "axios";

import { PdndError } from "../utils";

export interface VoucherRequest {
  /** Authorization server endpoint url */
  authServerEndpointUrl: string;
  /** Voucher request POST data */
  data: {
    /** The JWS obtained in the client assertion generation _(starts with “ey”)_ */
    client_assertion: string;
    /** Client assertion type (`urn:ietf:params:oauth:client-assertion-type:jwt-bearer`) */
    client_assertion_type: string;
    /** Client ID */
    client_id: string;
    /** Grant type (`client_credentials`) */
    grant_type: string;
  };
}

/**
 * PDND Interoperability **Voucher** interface
 */
export interface Voucher {
  /** Voucher spendable on the provider's e-service */
  access_token: string;
  /** Voucher duration _(seconds)_ */
  expires_in: number;
  /** Type of access token represented by the voucher */
  token_type: "Bearer";
}

export const requestVoucher = async (vr: VoucherRequest) => {
  try {
    // TEST: Simula errore PDND
    if (process.env.FORCE_PDND_ERROR === "true") {
      throw new AxiosError("PDND server error (test mode)");
    }

    const { data } = await axios.post<Voucher>(
      vr.authServerEndpointUrl,
      new URLSearchParams(Object.entries(vr.data)).toString(),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );
    return data;
  } catch (error) {
    throw new PdndError("Failed to request voucher", error);
  }
};
