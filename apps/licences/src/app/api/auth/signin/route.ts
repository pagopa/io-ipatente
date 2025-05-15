import { signIn } from "@/auth";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  console.log("[signin] request: ", request);
  console.log("[signin] request.nextUrl.pathname: " + request.nextUrl.pathname);

  const url = new URL(request.url);
  const callbackUrl = url.searchParams.get("callbackUrl") ?? url.href;
  console.log("[signin] callbackUrl: " + callbackUrl);

  return signIn("fims", {
    redirectTo: request.url,
  });
};
