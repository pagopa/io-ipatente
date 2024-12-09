import { z } from "zod";

export const AssertionRefSha256 = z
  .string()
  .regex(/^(sha256-[A-Za-z0-9-_=]{1,44})$/);
export type AssertionRefSha256 = z.infer<typeof AssertionRefSha256>;

export const AssertionRefSha384 = z
  .string()
  .regex(/^(sha384-[A-Za-z0-9-_=]{1,66})$/);
export type AssertionRefSha384 = z.infer<typeof AssertionRefSha384>;

export const AssertionRefSha512 = z
  .string()
  .regex(/^(sha512-[A-Za-z0-9-_=]{1,88})$/);
export type AssertionRefSha512 = z.infer<typeof AssertionRefSha512>;

export const AssertionRef = z.union([
  AssertionRefSha256,
  AssertionRefSha384,
  AssertionRefSha512,
]);
export type AssertionRef = z.infer<typeof AssertionRef>;

export enum AssertionTypeEnum {
  "OIDC" = "OIDC",
  "SAML" = "SAML",
}

export const AssertionType = z.enum(["SAML", "OIDC"]);
export type AssertionType = z.infer<typeof AssertionType>;

export const JwkPubKeyHashAlgorithmEnum = z.enum([
  "sha256",
  "sha384",
  "sha512",
]);

/**
 * Represents the selected hashing algorithm for jwk thumbprint
 */
export type JwkPubKeyHashAlgorithm = z.infer<typeof JwkPubKeyHashAlgorithmEnum>;
export const JwkPubKeyHashAlgorithm = JwkPubKeyHashAlgorithmEnum;

/**
 * The Public Key JWK type. It could be either an ECKey or an RSAKey.
 */
const RSAKey = z.object({
  alg: z.string(),
  e: z.string(),
  kty: z.literal("RSA"),
  n: z.string(),
});

const ECKey = z.object({
  crv: z.string(),
  kty: z.literal("EC"),
  x: z.string(),
  y: z.string(),
});

export const JwkPublicKey = z.union([RSAKey, ECKey]);
export type JwkPublicKey = z.infer<typeof JwkPublicKey>;

/**
 * A valid Fiscal Number (for persons)
 */
export const FiscalCode = z
  .string()
  .regex(
    /^[A-Z]{6}[0-9LMNPQRSTUV]{2}[ABCDEHLMPRST][0-9LMNPQRSTUV]{2}[A-Z][0-9LMNPQRSTUV]{3}[A-Z]$/,
  );
export type FiscalCode = z.infer<typeof FiscalCode>;
