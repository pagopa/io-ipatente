import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  // TODO: Find a better way to handle cookies
  const cookieState = req.nextUrl.searchParams.get("authjs.state") ?? "";
  const cookieCallbackUrl =
    req.nextUrl.searchParams.get("authjs.callback-url") ?? "";

  req.nextUrl.pathname = "/api/auth/callback/fims";
  req.nextUrl.searchParams.delete("authjs.state");
  req.nextUrl.searchParams.delete("authjs.callback-url");

  const response = NextResponse.redirect(req.nextUrl);

  response.cookies.set("authjs.state", cookieState);
  response.cookies.set("authjs.callback-url", cookieCallbackUrl);

  return response;
};
