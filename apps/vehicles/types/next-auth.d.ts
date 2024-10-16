/**
 * next-auth` module augmentation _(used to augment `user` and `session.user` interface)_
 */
import { DefaultUser } from "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface User extends CustomUser {}
  interface Session {
    user: User;
  }

  interface Profile {
    assertion?: string;
    assertion_ref?: string;
    fiscal_code: string;
    public_key?: string;
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface JWT extends CustomUser {}
}

interface CustomUser extends DefaultUser {
  familyName?: string;
  fiscalCode: string;
  givenName?: string;
}
