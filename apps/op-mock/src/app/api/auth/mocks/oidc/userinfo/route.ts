import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      family_name: "Rossi",
      fiscal_code: "BRNGCM85P19H501Z",
      given_name: "Mario",
      sub: "1234567890",
    },
    { status: 200 },
  );
}
