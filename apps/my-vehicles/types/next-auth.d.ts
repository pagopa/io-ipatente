import { JWT } from "next-auth/jwt"
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user?: User;
  }

  interface User {
    fiscalCode: string;
    givenName?: string;
    familyName?: string;
  }

  interface Profile {
    fiscal_code: string;
    public_key?: string;
    assertion_ref?: string;
    assertion?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    fiscalCode: string;
    givenName?: string;
    familyName?: string;
  }
}
