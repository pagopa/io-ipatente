import type { NextAuthRequest, NextAuthResult, Session } from "next-auth";

export type AuthParams = Parameters<NextAuthResult["auth"]>;

export type AuthRouteHandler = (
  request: NextAuthRequest,
  ctx?: { params?: Record<string, string | string[]> },
) => Promise<Response | undefined> | Response | undefined;

export interface TypedAuth {
  (): Promise<null | Session>;
  (handler: RouteHandlerFn): (req: Request) => Promise<Response>;
}

type RouteHandlerFn = (
  request: NextAuthRequest,
  ctx?: { params?: Record<string, string | string[]> },
) => Promise<Response | undefined> | Response | undefined;
