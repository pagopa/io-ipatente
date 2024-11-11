import { NextResponse } from "next/server";

export const getMockForbiddenResponse = () =>
  NextResponse.json(
    { message: "API available only in development or test environment." },
    { status: 403 },
  );
