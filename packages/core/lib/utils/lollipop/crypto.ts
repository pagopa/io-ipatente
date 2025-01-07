import * as jose from "jose";

import { JwkPubKeyHashAlgorithm, JwkPublicKey } from "./types";

/**
 * Returns a function that take the input jwkPubKey and return its thumbprint encoded in base64.
 * The thumbprint is calculated using the input hash algo (default to sha256);
 *
 * @param algo the hash algorithm used to compute the thumbprint
 * @returns a function to calculate the thumprint
 */
export const calculateThumbprint =
  (algo?: JwkPubKeyHashAlgorithm) => (jwkPubKey: JwkPublicKey) => {
    try {
      const hashAlgo = algo || "sha256";
      const thumbprint = jose.calculateJwkThumbprint(jwkPubKey, hashAlgo);
      return thumbprint;
    } catch (e) {
      console.error("Can not calculate JwkThumbprint, reason => ", e);
      throw e;
    }
  };
