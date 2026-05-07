import { NextRequest } from "next/server";

import { signIn } from "@/auth";

export const GET = async (request: NextRequest) =>
  signIn("fims", {
    redirectTo: request.url,
  });
