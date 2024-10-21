import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_TITLE_BAD_REQUEST,
  HTTP_TITLE_FORBIDDEN,
  HTTP_TITLE_UNAUTHORIZED,
} from "@/lib/bff/constants";
import { NextResponse } from "next/server";

export class ManagedInternalError extends Error {
  additionalDetails?: string;
  constructor(message: string, additionalDetails?: unknown) {
    super(message);
    this.name = "ManagedInternalError";
    this.message = message;
    this.additionalDetails =
      typeof additionalDetails === "string"
        ? additionalDetails
        : JSON.stringify(additionalDetails);
  }
}

export const handleInternalErrorResponse = (
  title: string,
  error: unknown,
): NextResponse => {
  let message = "Something went wrong";
  if (error instanceof ManagedInternalError) {
    message = error.message;
  }
  return NextResponse.json(
    {
      detail: message,
      status: HTTP_STATUS_INTERNAL_SERVER_ERROR,
      title,
    },
    { status: HTTP_STATUS_INTERNAL_SERVER_ERROR },
  );
};

export const handleBadRequestErrorResponse = (detail: string): NextResponse =>
  NextResponse.json(
    {
      detail,
      status: HTTP_STATUS_BAD_REQUEST,
      title: HTTP_TITLE_BAD_REQUEST,
    },
    { status: HTTP_STATUS_BAD_REQUEST },
  );

export const handleForbiddenErrorResponse = (detail: string): NextResponse =>
  NextResponse.json(
    {
      detail,
      status: HTTP_STATUS_FORBIDDEN,
      title: HTTP_TITLE_FORBIDDEN,
    },
    { status: HTTP_STATUS_FORBIDDEN },
  );

export const handleUnauthorizedErrorResponse = (detail: string): NextResponse =>
  NextResponse.json(
    {
      detail,
      status: HTTP_STATUS_UNAUTHORIZED,
      title: HTTP_TITLE_UNAUTHORIZED,
    },
    { status: HTTP_STATUS_UNAUTHORIZED },
  );
