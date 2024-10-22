import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export interface ClientAssertion {
  /** The algorithm used to sign this JWT. At this time it can only be signed with `RS256`. */
  alg: "RS256";
  /** The target audience: in project case a PDND Interoperability resource. */
  aud: string;
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

export const generateClientAssertion = ({
  alg,
  aud,
  iss,
  kid,
  privateKey,
  purposeId,
  sub,
  typ,
}: ClientAssertion) => {
  try {
    // Varables for JWT token
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 43200 * 60; // 43200 ninutes (30 days)
    const jti = uuidv4();

    // JWT Headers
    const headersRSA = { alg, kid, typ };

    // JWT Payload
    const payload = { aud, exp, iat, iss, jti, purposeId, sub };

    return jwt.sign(payload, privateKey, {
      algorithm: alg,
      header: headersRSA,
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(
      `An Error has occurred while generating client assertion, caused by: `,
      error,
    );
  }
};
