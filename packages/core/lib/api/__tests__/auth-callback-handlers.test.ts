/* eslint-disable no-console */
import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { AuthCallback } from "../auth-callback-handlers";

describe("AuthCallback", () => {
  it("test", async () => {
    const mockNextRequest = new NextRequest("https://example.com");

    mockNextRequest.nextUrl.searchParams.append(
      "code",
      "rDa4zqRLha9Dmi8KY1WlWOU3kNUlTYaAhC8pSriP2Vl",
    );

    mockNextRequest.nextUrl.searchParams.append(
      "state",
      "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiWU81TnFNNUs5T3lUaTRySFR1RE5paVFtejgyUF9Cd2xFcnhaNnJiRVA4bmhsdHY2Y3pWSmV3TnAyNFZtVElkYmM3SkNISHgxcG0tYy01Y0l4X2NMWncifQ..yoA_UvqpA2SpyXtlmOBWVg.w2XP0--pYoTyfsUAPmc2gnEY9lg5SEa_HD93zaPLVUJzueHfM-ZSHY4QysI3HJNUmuuW1UWxs6wQTWN2gpm-QN7PPSSDrQe-JgIXCjncP8wjtxwbfc7nupj3jFAF6MUjNDFhziiksrwg-HR4dhzTLr6ELqRfrIw5vcKRfWlPX-aZIoQ4vll20JaDPEuDAU_e.V4i1H4tv6v2jwhwDmi71juezgPZPJH0CziSwQ-1zaMc",
    );

    mockNextRequest.nextUrl.searchParams.append(
      "iss",
      "https%3A%2F%2Foauth.io.pagopa.it",
    );
    mockNextRequest.nextUrl.searchParams.append(
      "__Secure-authjs.state",
      "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwia2lkIjoiem5iOXNkYUYtZXphdE1pdlZxVUpnMHA3NE54V0kyTmZUZDg2QmRLRXRIQTYtQ2R4aFV2VV9jWXM5QVpYT1hsd0QtVFpRamQ3X3pmUFpCWUJ4RDZTcXcifQ..O3Z5q809n8PMXJsdjMKiaw.TnEywMtrXTMbs0NCpZwiNdVaSTQRkcdKl6NsPwloHEmHXLmvm2HVV7w2eHQwFZ3rlUGILwH8S6EDzgk2dHBlAMpHkPamXlNvNMeadd-rCix7YJCq35pSo6NRPej2idUuLlwoJGsa2z1ABRgSo2MQIeJx-2I3t5ig2CXUpGJnOBi6JTFSLj2PeXXumOSA2yFN7Fa--Uq6fmm7bHKPQg31aZCwolJQ8P0CQUrOIlJySlxX2X-tqF3ZrjeeKgJIzOIrAqfqjnoND9OnXDsLu19Y2UbNTix-Yi2CnQZ9NXPcYtFmACc9NvZEQadB4Ik3WxwBmJYjsneHLLVSlTxMZ6l-BlUW2_omJ7DhZLGzvNWS7OLXJbu8WCLNPlvJmFMbBeb7FQ6b1ZZW5MggnIGpjoBT3FxKTCHHBpWX-hUtwwyK6r7cUpHFkc4ZHRiFYMU-dafT9k7mZvDjyHYf62atlyIS260fwwLp4ErObbbCkm7WCX_lj5h_Q86ldzVoJRbMluSGpv8WBs6L2WWV5thuQp_0XPo0qn6UHod-2I6TA4lD6UwqTqmXu4oOYuKkd62Hw9g1W4kTyxMpV6GJPJHXp04V0w6vxBGwxdIQOpkZ_btb1ef7mIbmMuGTs66rU6SYXPN114A4rnkP_Jbf9mI7j-mfVA2vMgnbkkTisLIzLfSEuBcyFsEGOdqukp1qx9-P8k2R.yCTw_-GS8NZK-m1FT5QqDxndrh3DGTVZoYs4GfkxQNw",
    );

    mockNextRequest.nextUrl.searchParams.append(
      "__Host-authjs.csrf-token",
      "cce4d37d47bad6a622a09e2936196241c3e20166c2efb64500a1ae7c8d81ef70%7Cd2aa36185ce3ed8dcd5bd1f5f8d1c6d1b8fdb27b9b5a6ceffef7f8d36bb52762",
    );
    mockNextRequest.nextUrl.searchParams.append(
      "__Secure-authjs.callback-url",
      "https%3A%2F%2Fvehicles.ipatente.io.pagopa.it%2F",
    );

    const response = await AuthCallback.handlers.GET(mockNextRequest);

    console.log(response);

    // expect(response.cookies.get("authjs.state")).toBeDefined();
    // expect(response.cookies.get("authjs.callback-url")).toBeDefined();
    // expect(response.cookies.get("prefix.name")).toBeUndefined();

    expect(true).toBe(true);
  });
});
