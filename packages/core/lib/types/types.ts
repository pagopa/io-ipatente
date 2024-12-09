import { NextAuthResult } from "next-auth";

export type AuthParams = Parameters<NextAuthResult["auth"]>;

export type AuthRouteHandler = AuthParams[0];
