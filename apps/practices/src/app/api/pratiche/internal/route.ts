import { auth } from "@/auth";
import { Pratica } from "@/generated/bff-openapi";
import { retrievePractices } from "@/lib/bff/business";
import { logger } from "@/lib/bff/logger";
import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
  withTestUserAndVoucherInternalHandler,
} from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

/**
 * @description Retrieve user practices
 */
export const GET = auth(
  withTestUserAndVoucherInternalHandler(logger)(
    async (_request: Request, { additionalDataJWS, testUser, voucher }) => {
      try {
        const res = await retrievePractices(logger)(
          additionalDataJWS,
          voucher.access_token,
          testUser,
        );

        const practices = z.array(Pratica).safeParse(res);

        if (practices.success) {
          return NextResponse.json(practices.data);
        }

        if (res instanceof AxiosError) {
          return NextResponse.json(
            { detail: res.message, status: res.status },
            { status: res.status },
          );
        }

        if (res instanceof ZodiosError) {
          return handleBadRequestErrorResponse(res.message);
        }

        return handleInternalErrorResponse(
          "PracticesInternalRetrieveError",
          res,
        );
      } catch (error) {
        logger.error(
          `An Error has occurred while retrieving user practices, caused by: `,
          { error },
        );
        return handleInternalErrorResponse(
          "PracticesInternalRetrieveError",
          error,
        );
      }
    },
  ),
);
