import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BffError } from "../../utils/errors";
import {
  ClientAssertion,
  generateAdditionalDataJWS,
  generateClientAssertion,
  getAdditionalPayload,
} from "../client-assertion";

vi.mock("jsonwebtoken");
vi.mock("uuid");

const mockJwtSign = vi.mocked(jwt.sign);
const mockUuidv4 = vi.mocked(uuidv4);

describe("Client Assertion", () => {
  const mockClientAssertion: ClientAssertion = {
    additionalData: {
      LoA: "high",
      aud: "eServiceAudience",
      userID: "mockUserID",
      userLocation: "mockUserLocation",
    },
    alg: "RS256",
    aud: "https://example.com",
    exp: 600,
    iss: "client-id",
    kid: "key-id",
    privateKey: "private-key",
    purposeId: "purpose-id",
    sub: "client-id",
    typ: "JWT",
  };

  beforeEach(() => {
    mockJwtSign.mockClear();
    mockUuidv4.mockClear();
  });

  it("should generate a valid JWT with correct headers and payload", () => {
    const mockJti = "unique-uuid";
    mockUuidv4.mockReturnValue(mockJti);

    // Mock jwt.sign to return different tokens for each call (first in generateAdditionalDataJWS and then in generateClientAssertion itself)
    mockJwtSign
      .mockImplementationOnce(() => "mocked-additional-data-jwt") // generateAdditionalDataJWS
      .mockImplementationOnce(() => "mocked-client-assertion-jwt"); // generateClientAssertion

    const iat = Math.floor(Date.now() / 1000);

    const expectedHeaders = {
      alg: mockClientAssertion.alg,
      kid: mockClientAssertion.kid,
      typ: mockClientAssertion.typ,
    };

    // Payload for additionalDataJWS (first call)
    const expectedAdditionalDataPayload = {
      ...mockClientAssertion.additionalData,
      exp: iat + mockClientAssertion.exp,
      iat,
      iss: mockClientAssertion.iss,
      jti: mockJti,
      purposeId: mockClientAssertion.purposeId,
    };

    // Expected payload for clientAssertionJWS (second call)
    const expectedClientAssertionPayload = {
      aud: mockClientAssertion.aud,
      digest: {
        alg: "SHA256",
        value:
          "f0cffe6960a781fdd10a77793755ec1e60cf86abccabc889d396f61e7eea2622", // SHA256 hash of "mocked-additional-data-jwt"
      },
      exp: iat + mockClientAssertion.exp,
      iat,
      iss: mockClientAssertion.iss,
      jti: mockJti,
      purposeId: mockClientAssertion.purposeId,
      sub: mockClientAssertion.sub,
    };

    const result = generateClientAssertion(mockClientAssertion);

    expect(result).toBeDefined();
    expect(result.clientAssertionJWS).toBe("mocked-client-assertion-jwt");
    expect(result.additionalDataJWS).toBe("mocked-additional-data-jwt");

    expect(mockJwtSign).toHaveBeenCalledTimes(2);

    expect(mockJwtSign).toHaveBeenNthCalledWith(
      1,
      expectedAdditionalDataPayload,
      mockClientAssertion.privateKey,
      {
        algorithm: mockClientAssertion.alg,
        header: expectedHeaders,
      },
    );

    expect(mockJwtSign).toHaveBeenNthCalledWith(
      2,
      expectedClientAssertionPayload,
      mockClientAssertion.privateKey,
      {
        algorithm: mockClientAssertion.alg,
        header: expectedHeaders,
      },
    );

    expect(mockUuidv4).toHaveBeenCalledWith();
  });

  it("should handle errors and throw BffError", () => {
    mockJwtSign.mockImplementation(() => {
      throw new Error("Signing error");
    });

    expect(() => generateClientAssertion(mockClientAssertion)).toThrow(
      BffError,
    );
  });
});

describe("generateAdditionalDataJWS", () => {
  const mockAdditionalData = {
    LoA: "high",
    aud: "eServiceAudience",
    userID: "mockUserID",
    userLocation: "mockUserLocation",
  };

  const mockHeader = {
    alg: "RS256",
    kid: "key-id",
    typ: "JWT",
  };

  beforeEach(() => {
    mockJwtSign.mockClear();
    mockUuidv4.mockClear();
  });

  it("should generate additional data JWS with correct payload", () => {
    const mockJti = "unique-uuid";
    mockUuidv4.mockReturnValue(mockJti);
    mockJwtSign.mockImplementation(() => "mocked-additional-data-jwt");

    const iat = Math.floor(Date.now() / 1000);

    const result = generateAdditionalDataJWS({
      additionalData: mockAdditionalData,
      exp: 600,
      header: mockHeader,
      iss: "client-id",
      privateKey: "private-key",
      purposeId: "purpose-id",
    });

    expect(result).toBe("mocked-additional-data-jwt");

    const expectedPayload = {
      ...mockAdditionalData,
      exp: iat + 600,
      iat,
      iss: "client-id",
      jti: mockJti,
      purposeId: "purpose-id",
    };

    expect(mockJwtSign).toHaveBeenCalledTimes(1);
    expect(mockJwtSign).toHaveBeenCalledWith(expectedPayload, "private-key", {
      algorithm: "RS256",
      header: mockHeader,
    });
  });

  it("should throw BffError when JWT sign fails", () => {
    mockJwtSign.mockImplementation(() => {
      throw new Error("JWT signing failed");
    });

    expect(() =>
      generateAdditionalDataJWS({
        additionalData: mockAdditionalData,
        exp: 600,
        header: mockHeader,
        iss: "client-id",
        privateKey: "private-key",
        purposeId: "purpose-id",
      }),
    ).toThrow(BffError);
  });
});

describe("getAdditionalPayload", () => {
  it("should return correct digest for a given JWT string", () => {
    const testJWT = "mocked-additional-data-jwt";
    const expectedHash =
      "f0cffe6960a781fdd10a77793755ec1e60cf86abccabc889d396f61e7eea2622";

    const result = getAdditionalPayload(testJWT);

    expect(result).toEqual({
      digest: {
        alg: "SHA256",
        value: expectedHash,
      },
    });
  });

  it("should return different hashes for different inputs", () => {
    const jwt1 = "first-jwt-token";
    const jwt2 = "second-jwt-token";

    const result1 = getAdditionalPayload(jwt1);
    const result2 = getAdditionalPayload(jwt2);

    expect(result1.digest.value).not.toBe(result2.digest.value);
  });

  it("should return consistent hash for the same input", () => {
    const testJWT = "consistent-jwt-token";

    const result1 = getAdditionalPayload(testJWT);
    const result2 = getAdditionalPayload(testJWT);

    expect(result1.digest.value).toBe(result2.digest.value);
  });
});
