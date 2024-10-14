import { getMockForbiddenResponse } from "@/app/api/auth/mocks/mocks-util";
import { getConfiguration } from "@/config";
import { NextResponse } from "next/server";

export async function GET() {
  if (getConfiguration().IS_PRODUCTION) return getMockForbiddenResponse();

  return NextResponse.json({}, { status: 200 });
}
