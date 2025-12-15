import { AxiosError } from "axios";
import { NextResponse } from "next/server";

import {
  HTTP_STATUS_BAD_REQUEST,
  HTTP_STATUS_FORBIDDEN,
  HTTP_STATUS_INTERNAL_SERVER_ERROR,
  HTTP_STATUS_UNAUTHORIZED,
  HTTP_TITLE_BAD_REQUEST,
  HTTP_TITLE_FORBIDDEN,
  HTTP_TITLE_UNAUTHORIZED,
} from "./constants";
import { AxiosErrorEnriched } from "./errorTypes";

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
  source?: string,
): NextResponse => {
  let message = "Something went wrong";
  if (error instanceof ManagedInternalError) {
    message = error.message;
  }

  return NextResponse.json(
    {
      detail: message,
      source,
      status: HTTP_STATUS_INTERNAL_SERVER_ERROR,
      title,
    },
    { status: HTTP_STATUS_INTERNAL_SERVER_ERROR },
  );
};

export const handleBadRequestErrorResponse = (
  detail: string,
  source?: string,
): NextResponse =>
  NextResponse.json(
    {
      detail,
      source,
      status: HTTP_STATUS_BAD_REQUEST,
      title: HTTP_TITLE_BAD_REQUEST,
    },
    { status: HTTP_STATUS_BAD_REQUEST },
  );

export const handleForbiddenErrorResponse = (
  detail: string,
  source?: string,
): NextResponse =>
  NextResponse.json(
    {
      detail,
      source,
      status: HTTP_STATUS_FORBIDDEN,
      title: HTTP_TITLE_FORBIDDEN,
    },
    { status: HTTP_STATUS_FORBIDDEN },
  );

export const handleUnauthorizedErrorResponse = (
  detail: string,
  source?: string,
): NextResponse =>
  NextResponse.json(
    {
      detail,
      source,
      status: HTTP_STATUS_UNAUTHORIZED,
      title: HTTP_TITLE_UNAUTHORIZED,
    },
    { status: HTTP_STATUS_UNAUTHORIZED },
  );

export const handleAxiosErrorResponse = (error: AxiosError): NextResponse => {
  const source = error instanceof AxiosErrorEnriched ? error.source : undefined;
  const status =
    error.response?.status ?? error.status ?? HTTP_STATUS_INTERNAL_SERVER_ERROR;

  return NextResponse.json(
    {
      detail: error.message,
      source,
      status,
    },
    { status },
  );
};
