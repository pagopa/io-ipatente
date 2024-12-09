import type { DefaultSession, NextAuthConfig } from "next-auth";

import { getConfiguration } from "../config";

declare module "next-auth" {
  interface User {
    familyName?: string;
    fiscalCode: string;
    givenName?: string;
  }

  interface Session {
    user: DefaultSession["user"] & User;
  }

  interface Profile {
    assertion?: string;
    assertion_ref?: string;
    fiscal_code: string;
    public_key?: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    familyName?: string;
    fiscalCode: string;
    givenName?: string;
  }
}

const maxAgeSeconds = 2 * 60 * 60; // 2 hours

export const authConfig: NextAuthConfig = {
  callbacks: {
    jwt: ({ profile, token }) => {
      if (profile) {
        // TODO: Add lollipop check
        // TODO: Add zod model check
        const { family_name, fiscal_code, given_name } = profile;
        token.fiscalCode = fiscal_code;
        token.familyName = family_name ?? "";
        token.givenName = given_name ?? "";
      }
      return token;
    },
    session: ({ session, token }) => {
      // update the session.user based on the token object
      if (token && session.user) {
        session.user.familyName = token.familyName;
        session.user.fiscalCode = token.fiscalCode;
        session.user.givenName = token.givenName;
      }
      return session;
    },
  },
  jwt: {
    maxAge: maxAgeSeconds,
  },
  pages: {
    signIn: "/api/auth/signin",
  },
  providers: [
    {
      authorization: {
        params: {
          scope: "openid profile lollipop",
        },
      },
      checks: ["state"],
      clientId: getConfiguration().OIDC_CLIENT_ID,
      clientSecret: getConfiguration().OIDC_CLIENT_SECRET,
      id: "fims",
      idToken: false,
      issuer: getConfiguration().OIDC_ISSUER_URL,
      name: "fims",
      type: "oidc",
    },
  ],
  session: {
    maxAge: maxAgeSeconds,
  },
};
