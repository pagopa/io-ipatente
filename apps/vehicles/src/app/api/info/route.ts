import { NextResponse } from "next/server";

import packageJson from "../../../../package.json";

export const dynamic = "force-dynamic";

/**
 * `api/info` route handler
 * @returns project _name_ and _version_
 */
export async function GET() {
  const response = {
    name: packageJson.name,
    version: packageJson.version,
  };

  return NextResponse.json(response, { status: 200 });
}
