import { NextResponse } from "next/server";

import packageJson from "../../../../package.json";

/**
 * `api/info` route handler
 * @returns project _name_ and _version_
 */
export async function GET() {
  const response = {
    name: packageJson.name,
    version: packageJson.version,
  };

  // eslint-disable-next-line no-console
  console.log("GET /api/info", response);

  return NextResponse.json(response, { status: 200 });
}
