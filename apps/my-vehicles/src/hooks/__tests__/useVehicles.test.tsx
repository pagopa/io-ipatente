import { renderHook, waitFor } from "@testing-library/react";
import { HttpResponse, http } from "msw";
import { describe, expect, it } from "vitest";

import { server } from "../../../mocks/server";
import { Wrapper } from "../../utils/testWrapper";
import { useVehicles } from "../useVehicles";

describe("useVehicles", () => {
  it("should return the list of vehicles if the status code is 200", async () => {
    const { result } = renderHook(() => useVehicles(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toBeDefined();
  });

  it("should return an error if the status code is different from 200", async () => {
    server.use(
      http.get("/api/infoVeicoli", () => HttpResponse.json({ status: 500 })),
    );

    const { result } = renderHook(() => useVehicles(), {
      wrapper: Wrapper,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
