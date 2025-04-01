import { describe, expect, test } from "vitest";
import { sanitizeRedirectPath } from "../strings";

describe("sanitizeRedirectPath", () => {
  const origin = "https://example.com";

  test("Should return URL object for valid same-origin URL", () => {
    const redirectPath = "https://example.com/dashboard";
    const result = sanitizeRedirectPath(origin, redirectPath);

    expect(result).toBeInstanceOf(URL);
    expect(result?.toString()).toBe(redirectPath);
  });

  test("Should return URL object for valid relative path", () => {
    const redirectPath = "/profile";
    const result = sanitizeRedirectPath(origin, redirectPath);

    expect(result).toBeInstanceOf(URL);
    expect(result?.toString()).toBe("https://example.com/profile");
  });

  test("Should return null for a different domain", () => {
    const redirectPath = "https://malicious-site.com/hack";
    const result = sanitizeRedirectPath(origin, redirectPath);

    expect(result).toBeNull();
  });

  test("Should return null for an invalid URL", () => {
    const redirectPath = "javascript:alert('hacked!')";
    const result = sanitizeRedirectPath(origin, redirectPath);

    expect(result).toBeNull();
  });

  test("Should return null for a malformed URL", () => {
    const redirectPath = "%E0%A4%A";
    const result = sanitizeRedirectPath(origin, redirectPath);

    expect(result).toBeNull();
  });
});
