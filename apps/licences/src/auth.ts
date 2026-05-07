import { authConfig, TypedAuth } from "@io-ipatente/core";
import NextAuth from "next-auth";

import { logger } from "./lib/bff/logger";

const {
  auth: typedAuth,
  handlers,
  signIn,
  signOut,
} = NextAuth(authConfig(logger));

export { handlers, signIn, signOut };
export const auth = typedAuth as unknown as TypedAuth;
