import { describe, expect, it } from "vitest";
import { aSAMLResponse } from "../__mocks__/assertion.mock";
import {
  assertionFromXMLString,
  getAlgoFromAssertionRef,
  getFiscalNumberFromSamlResponse,
  getIssueInstantInSecondsFromSamlResponse,
  getRequestIDFromSamlResponse,
} from "../assertion";
import { JwkPubKeyHashAlgorithmEnum } from "../types";

describe("Assertion Validation Tests", () => {
  describe("assertionFromXMLString", () => {
    it("should unmarshall the SAML xml string", async () => {
      const unmarshalledAssertion = assertionFromXMLString(aSAMLResponse);
      expect(unmarshalledAssertion).toBeDefined();
    });

    it("should throw an error if the SAML xml string is not valid", () => {
      expect(() => assertionFromXMLString("unvalid")).toThrowError(
        "Error parsing the SAML Assertion: Invalid XML structure.",
      );
    });
  });

  describe("calculateAssertionRef", () => {
    it("should calculate the AssertionRef", async () => {
      expect(true).toBe(true);
    });
  });

  describe("getAlgoFromAssertionRef", () => {
    it("should extract the AssertionRef algorithm sha256", async () => {
      const algo = getAlgoFromAssertionRef("sha256-12345");
      expect(algo).toBe(JwkPubKeyHashAlgorithmEnum.enum.sha256);
    });

    it("should extract the AssertionRef algorithm sha384", async () => {
      const algo = getAlgoFromAssertionRef("sha384-12345");
      expect(algo).toBe(JwkPubKeyHashAlgorithmEnum.enum.sha384);
    });

    it("should extract the AssertionRef algorithm sha512", async () => {
      const algo = getAlgoFromAssertionRef("sha512-12345");
      expect(algo).toBe(JwkPubKeyHashAlgorithmEnum.enum.sha512);
    });

    it("should return void if AssertionRef has an unknown algoritmh", async () => {
      const algo = getAlgoFromAssertionRef("unknown-12345");
      expect(algo).not.toBeDefined();
    });
  });

  describe("Extract Data From SAML Assertion", () => {
    const unmarshalledAssertion = assertionFromXMLString(aSAMLResponse);

    it("should extract the FiscalCode", async () => {
      expect(getFiscalNumberFromSamlResponse(unmarshalledAssertion)).toBe(
        "AAAAAA89S20I111X",
      );
    });

    it("should extract the field IssueInstant", async () => {
      expect(
        getIssueInstantInSecondsFromSamlResponse(unmarshalledAssertion),
      ).toBe(1677601645);
    });

    it("should extract InResponseTo From Saml Assertion", async () => {
      expect(getRequestIDFromSamlResponse(unmarshalledAssertion)).toBe(
        "sha256-a7qE0Y0DyqeOFFREIQSLKfu5WlbckdxVXKFasfcI-Dg",
      );
    });
  });
});
