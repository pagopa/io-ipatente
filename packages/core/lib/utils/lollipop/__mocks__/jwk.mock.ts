import { JwkPublicKey } from "../types";

export const aJwkPubKey: JwkPublicKey = {
  crv: "secp256k1",
  kty: "EC",
  x: "Q8K81dZcC4DdKl52iW7bT0ubXXm2amN835M_v5AgpSE",
  y: "lLsw82Q414zPWPluI5BmdKHK6XbFfinc8aRqbZCEv0A",
};

export const aNotValidRsaJwkPublicKey: JwkPublicKey = {
  alg: "alg",
  e: "e",
  kty: "RSA",
  n: "n",
};

export const aSha512PubKeyThumbprint =
  "WbgQ6E5Rzdj1HSBkRQbZ_CMI2O9IDReGkb-CcJIuv7dS8GKWrC4EPxy4rWXfQ9F-JWz-67VYfKRjS3m7uc8wBQ";

export const aSha384PubKeyThumbprint =
  "dmWR9bdB0RNEZTv0LqKqyiFOAb5f3zn3mDyMXH4-asKriaeV_tjdR-3MYPQ_PWWc";

export const aSha256PubKeyThumbprint =
  "LWmgzxnrIhywpNW0mctCFWfh2CptjGJJN_H2_FLN2fg";
