import { signIn } from "@/auth";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) =>
  signIn("fims", {
    redirectTo: request.url,
  });
