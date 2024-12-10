import { signIn } from "@/auth";

export const GET = async () =>
  signIn("fims", {
    redirectTo: "/",
  });
