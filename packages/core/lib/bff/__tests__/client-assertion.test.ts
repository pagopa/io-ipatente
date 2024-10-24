import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ClientAssertion, generateClientAssertion } from "../client-assertion";

vi.mock("jsonwebtoken");
vi.mock("uuid");

describe("Client Assertion", () => {
  const mockClientAssertion: ClientAssertion = {
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

  const mockJwtSign = vi.mocked(jwt.sign);
  const mockUuidv4 = vi.mocked(uuidv4);

  beforeEach(() => {
    mockJwtSign.mockClear();
    mockUuidv4.mockClear();
  });

  it("should generate a valid JWT with correct headers and payload", () => {
    const mockJti = "unique-uuid";
    mockUuidv4.mockReturnValue(mockJti);

    const iat = Math.floor(Date.now() / 1000);
    
    const expectedPayload = {
      aud: mockClientAssertion.aud,
      exp: iat + mockClientAssertion.exp,
      iat,
      iss: mockClientAssertion.iss,
      jti: mockJti,
      purposeId: mockClientAssertion.purposeId,
      sub: mockClientAssertion.sub,
    };

    const expectedHeaders = {
      alg: mockClientAssertion.alg,
      kid: mockClientAssertion.kid,
      typ: mockClientAssertion.typ,
    };

    generateClientAssertion(mockClientAssertion);

    expect(mockUuidv4).toHaveBeenCalledWith();
    expect(mockJwtSign).toHaveBeenCalledWith(
      expectedPayload,
      mockClientAssertion.privateKey,
      {
        algorithm: mockClientAssertion.alg,
        header: expectedHeaders,
      },
    );
  });

  it("should handle errors and return undefined", () => {
    mockJwtSign.mockImplementation(() => {
      throw new Error("Signing error");
    });

    const result = generateClientAssertion(mockClientAssertion);

    expect(result).toBeUndefined();
    expect(mockJwtSign).toThrowError("Signing error");
  });
});
