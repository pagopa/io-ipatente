/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth, { type DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User;
  }

  interface User {
    familyName?: string;
    fiscalCode: string;
    givenName?: string;
  }

  interface Profile {
    assertion?: string;
    assertion_ref?: string;
    fiscal_code: string;
    public_key?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    familyName?: string;
    fiscalCode: string;
    givenName?: string;
  }
}
