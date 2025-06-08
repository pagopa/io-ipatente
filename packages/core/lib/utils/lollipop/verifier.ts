import {
  calculateAssertionRef,
  getAlgoFromAssertionRef,
  getFiscalNumberFromSamlResponse,
  getRequestIDFromSamlResponse,
} from "./assertion";
import { AssertionRef, FiscalCode, JwkPublicKey } from "./types";

/**
 * Check if the InResponseTo field included into the SAMLResponse match
 * - with the provided assertionRef
 * - with the calculateAssertionRef using the publick_key thumbprint.
 */
export const verifyAssertionRefVsInRensponseTo = (
  pubKey: JwkPublicKey,
  assertionRefFromHeader: string,
  assertionDoc: Document,
) => {
  try {
    const inResponseTo = getRequestIDFromSamlResponse(assertionDoc);
    if (!inResponseTo) {
      throw new Error("Missing request id in the retrieved SAML assertion.");
    }

    const parsedAssertionRef = AssertionRef.safeParse(inResponseTo);
    if (!parsedAssertionRef.success) {
      throw new Error(
        "InResponseTo in the assertion does not contain a valid Assertion Ref.",
      );
    }

    const algo = getAlgoFromAssertionRef(inResponseTo);
    const calcAssertionRef = calculateAssertionRef(algo)(pubKey);
    if (
      calcAssertionRef !== inResponseTo ||
      assertionRefFromHeader !== inResponseTo
    ) {
      throw new Error(
        `The hash of the provided public key does not match the InResponseTo in the assertion: fromSaml=${inResponseTo}, fromPublicKey=${calcAssertionRef}, fromHeader=${assertionRefFromHeader}`,
      );
    }
  } catch (error) {
    console.error("Error verifying the assertion ref:", error);
    throw new Error("Error verifying the assertionRef");
  }
};

/**
 * Check if the Fiscal Number included into the SAMLResponse match with the provided parameter.
 */
export const verifyAssertionUserIdVsCfVerifier = (
  fiscalCodeFromHeader: FiscalCode,
  assertionDoc: Document,
) => {
  const fiscalCodeFromAssertion = getFiscalNumberFromSamlResponse(assertionDoc);
  if (!fiscalCodeFromAssertion) {
    throw new Error(
      "Missing or invalid Fiscal Code in the retrieved saml assertion.",
    );
  }

  if (fiscalCodeFromAssertion !== fiscalCodeFromHeader) {
    throw new Error(
      `The provided user id do not match the fiscalNumber in the assertion: fromSaml=${fiscalCodeFromAssertion},fromHeader=${fiscalCodeFromHeader}`,
    );
  }
};
