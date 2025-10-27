import { authConfig } from "@io-ipatente/core";
import NextAuth from "next-auth";

import { logger } from "./lib/bff/logger";

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig(logger));
