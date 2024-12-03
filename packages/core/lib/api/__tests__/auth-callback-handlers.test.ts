import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { AuthCallback } from "../auth-callback-handlers";

describe("AuthCallback", () => {
  it("should set cookies from query parameters in the request", async () => {
    const mockNextRequest = new NextRequest("https://example.com");

    mockNextRequest.nextUrl.searchParams.append("authjs.state", "12345");
    mockNextRequest.nextUrl.searchParams.append(
      "authjs.callback-url",
      "https://callback.com",
    );

    const response = await AuthCallback.handlers.GET(mockNextRequest);

    expect(response.cookies.get("authjs.state")).toBeDefined();
    expect(response.cookies.get("authjs.callback-url")).toBeDefined();
    expect(response.cookies.get("prefix.name")).toBeUndefined();
  });
});
