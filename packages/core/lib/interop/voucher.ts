import axios from "axios";

import { CoreLogger } from "../types/logger";

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

export const requestVoucher =
  (logger: CoreLogger) => async (vr: VoucherRequest) => {
    try {
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
      logger.error(
        `An Error has occurred while requesting voucher, caused by: `,
        { error },
      );
      throw error;
    }
  };
