import { NextResponse } from "next/server";

// GET without params are statics, this will force the route to be dynamic
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({}, { status: 200 });
}
