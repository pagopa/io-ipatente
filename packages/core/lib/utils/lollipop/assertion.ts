import { DOMParser } from "@xmldom/xmldom";

import { calculateThumbprint } from "./crypto";
import {
  AssertionRef,
  AssertionRefSha256,
  AssertionRefSha384,
  AssertionRefSha512,
  FiscalCode,
  JwkPubKeyHashAlgorithm,
  JwkPubKeyHashAlgorithmEnum,
  JwkPublicKey,
} from "./types";

const SAML_NAMESPACE = {
  ASSERTION: "urn:oasis:names:tc:SAML:2.0:assertion",
  PROTOCOL: "urn:oasis:names:tc:SAML:2.0:protocol",
};

const algoToAssertionRefSet = [
  { algo: JwkPubKeyHashAlgorithmEnum.enum.sha256, type: AssertionRefSha256 },
  { algo: JwkPubKeyHashAlgorithmEnum.enum.sha384, type: AssertionRefSha384 },
  { algo: JwkPubKeyHashAlgorithmEnum.enum.sha512, type: AssertionRefSha512 },
];

//TODO: test to see if the assertion received is already parsed or a SAML assertion XML string
// function which take the SAML assertion XML string and return the assertion object using DOMParser
export const assertionFromXMLString = (assertionXml: string): Document => {
  const assertionDoc = new DOMParser().parseFromString(
    assertionXml,
    "text/xml",
  );

  const parserError = assertionDoc.getElementsByTagName("parsererror");
  if (parserError.length > 0) {
    const message = `Error parsing the SAML Assertion: ${parserError[0].textContent}`;
    console.error(message);
    throw new Error(message);
  }

  if (
    !assertionDoc.documentElement ||
    assertionDoc.documentElement.nodeName === "parsererror"
  ) {
    const message = "Error parsing the SAML Assertion: Invalid XML structure.";
    console.error(message);
    throw new Error(message);
  }

  return assertionDoc;
};

//
export const calculateAssertionRef =
  (algo: JwkPubKeyHashAlgorithm) =>
  (jwkPublicKey: JwkPublicKey): AssertionRef => {
    const thumbprint = calculateThumbprint(algo)(jwkPublicKey);

    const assertionRefString = `${algo}-${thumbprint}`;
    const parsed = AssertionRef.safeParse(assertionRefString);

    if (!parsed.success) {
      throw new Error("Cannot decode master AssertionRef");
    }

    return parsed.data;
  };

export const getAlgoFromAssertionRef = (
  assertionRef: AssertionRef,
): JwkPubKeyHashAlgorithm => {
  const entry = algoToAssertionRefSet.find(
    (entry) => entry.type.safeParse(assertionRef).success,
  );
  return entry ? entry.algo : (void 0 as never);
};

export const getFiscalNumberFromSamlResponse = (
  assertionDoc: Document,
): FiscalCode | null => {
  const collection = assertionDoc.getElementsByTagNameNS(
    SAML_NAMESPACE.ASSERTION,
    "Attribute",
  );
  if (!collection) {
    return null;
  }

  const fiscalCodeElement = Array.from(collection).find(
    (elem) => elem.getAttribute("Name") === "fiscalNumber",
  );
  if (!fiscalCodeElement || !fiscalCodeElement.textContent) {
    return null;
  }

  const fiscalCode = fiscalCodeElement.textContent.trim().replace("TINIT-", "");
  const parsed = FiscalCode.safeParse(fiscalCode);

  return parsed.success ? parsed.data : null;
};

export const getAttributeFromSamlResponse =
  (tagName: string, attrName: string) => (doc: Document) => {
    const element = doc
      .getElementsByTagNameNS(SAML_NAMESPACE.ASSERTION, tagName)
      .item(0);
    return element?.getAttribute(attrName);
  };

export const getIssueInstantInSecondsFromSamlResponse = (
  assertionDoc: Document,
): null | number => {
  const issueInstantString = getAttributeFromSamlResponse(
    "Assertion",
    "IssueInstant",
  )(assertionDoc);

  if (!issueInstantString) {
    return null;
  }

  const issueInstantDate = new Date(issueInstantString);
  if (isNaN(issueInstantDate.getTime())) {
    return null;
  }

  return Math.floor(issueInstantDate.getTime() / 1000);
};

export const getRequestIDFromSamlResponse = getAttributeFromSamlResponse(
  "SubjectConfirmationData",
  "InResponseTo",
);
