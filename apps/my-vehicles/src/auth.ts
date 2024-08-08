import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    {
      id: "fims",
      name: "fims",
      type: "oidc",
      issuer: process.env.OIDC_ISSUER_URL,
      authorization: {
        params: {
          scope: "openid profile lollipop",
        },
      },
      checks: ["state"],
      clientId: process.env.OIDC_CLIENT_ID,
      clientSecret: process.env.OIDC_CLIENT_SECRET,
      idToken: false,
    },
  ],
  pages: {
    signIn: "/api/auth/signin",
  },
  callbacks: {
    jwt: ({ token, profile }) => {
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
});
