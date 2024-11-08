import { authConfig } from "@io-ipatente/core";
import NextAuth from "next-auth";

export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
