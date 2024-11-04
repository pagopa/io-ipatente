import crypto from "crypto";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export interface ClientAssertion {
  /** Additional data _(required for GovWay authentication)_.
   *
   * https://docs.pagopa.it/interoperabilita-1/manuale-operativo/utilizzare-i-voucher#il-flusso-in-dettaglio */
  additionalData: ClientAssertionAdditionalData;
  /** The algorithm used to sign this JWT. At this time it can only be signed with `RS256`. */
  alg: "RS256";
  /** The target audience: in project case a PDND Interoperability resource. */
  aud: string;
  /** Expiration time _(seconds since generation)_ */
  exp: number;
  /** The issuer of the request: in project case the id of this client. */
  iss: string;
  /** The id of the selected key. */
  kid: string;
  /** Private key value. */
  privateKey: string;
  /** The id of the selected purpose. */
  purposeId: string;
  /** The subject of the request: in project case always the client id. */
  sub: string;
  /** The type of object being sent, in project case `JWT`. */
  typ: "JWT";
}

/**
 * Client assertion Additional data _(required for GovWay authentication)_.
 */
interface ClientAssertionAdditionalData {
  /** security or guarantee level adopted in the user's domain authentication process */
  LoA: string;
  /** PDND Interoperability e-service audience _(get it on e-service technical specifications)_ */
  aud: string;
  /** user unique identifier within the domain of the user who determined the need for the request to the provider's e-service */
  userID: string;
  /** user unique location identifier within the domain of the user who determined the need for the request to the provider's e-service */
  userLocation: string;
}

/**
 * Client assertion Additional data digest _(as extra data of client assertion JWS)_.
 */
interface ClientAssertionAdditionalDataDigest {
  digest: {
    alg: "SHA256";
    value: string;
  };
}

interface ClientAssertionHeader {
  alg: string;
  kid: string;
  typ: string;
}

/** Interface for `generateAdditionalDataJWS` request */
interface ClientAssertionAdditionalDataRequest {
  additionalData: ClientAssertionAdditionalData;
  exp: number;
  header: ClientAssertionHeader;
  iss: string;
  privateKey: string;
  purposeId: string;
}

/**
 * Result interface for `generateClientAssertion` function
 */
export interface ClientAssertionResult {
  /**
   * JWS needed to get additional information that is not part of the standard fields provided by
   * PDND Interoperability within the client assertion.
   */
  additionalDataJWS: string;
  /** JWS with standard fields provided by PDND Interoperability within the client assertion. */
  clientAssertionJWS: string;
}

export const generateClientAssertion = ({
  additionalData,
  alg,
  aud,
  exp,
  iss,
  kid,
  privateKey,
  purposeId,
  sub,
  typ,
}: ClientAssertion): ClientAssertionResult | undefined => {
  try {
    // Variables for JWT token
    const iat = Math.floor(Date.now() / 1000);
    const expiration = iat + exp;
    const jti = uuidv4();

    // JWT Headers
    const header: ClientAssertionHeader = { alg, kid, typ };

    // JWS for additional data (GovWay)
    const additionalDataJWS = generateAdditionalDataJWS({
      additionalData,
      exp,
      header,
      iss,
      privateKey,
      purposeId,
    });

    // JWT Payload
    const payload = {
      aud,
      exp: expiration,
      iat,
      iss,
      jti,
      purposeId,
      sub,
      ...getAdditionalPayload(additionalDataJWS),
    };

    return {
      additionalDataJWS,
      clientAssertionJWS: jwt.sign(payload, privateKey, {
        algorithm: alg,
        header,
      }),
    };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `An Error has occurred while generating client assertion, caused by: `,
      error,
    );
  }
};

/**
 * Returns additional data JWS
 * @param `ClientAssertionAdditionalDataRequest`
 * @returns
 */
export const generateAdditionalDataJWS = ({
  additionalData,
  exp,
  header,
  iss,
  privateKey,
  purposeId,
}: ClientAssertionAdditionalDataRequest) => {
  try {
    const iat = Math.floor(Date.now() / 1000);
    const expiration = iat + exp;
    const jti = uuidv4();

    const additionalDataJWS = jwt.sign(
      {
        ...additionalData,
        exp: expiration,
        iat,
        iss,
        jti,
        purposeId,
      },
      privateKey,
      {
        algorithm: "RS256",
        header,
      },
    );

    return additionalDataJWS;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `An Error has occurred while getting additional data JWS, caused by: `,
      error,
    );
    return "";
  }
};

/**
 * Returns `digest` object with algorithm _(for now only SHA256 supported)_ and
 * fixed-length hash of the additional data JWS.
 * @param additionalDataJWS
 * @returns
 */
export const getAdditionalPayload = (additionalDataJWS: string) => {
  let result: ClientAssertionAdditionalDataDigest;
  try {
    const digestValue = hashSha256(additionalDataJWS);

    result = {
      digest: {
        alg: "SHA256",
        value: digestValue,
      },
    };

    return result;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `An Error has occurred while getting additional payload data, caused by: `,
      error,
    );
  }
};

const hashSha256 = (input: string) =>
  crypto.createHash("sha256").update(input).digest("hex");
