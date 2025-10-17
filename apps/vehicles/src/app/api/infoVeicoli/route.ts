import { auth } from "@/auth";
import { Veicolo } from "@/generated/bff-openapi";
import { retrieveVehicles } from "@/lib/bff/business";
import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
  withJWTAuthAndVoucherHandler,
} from "@io-ipatente/core";
import { logger } from "@io-ipatente/logger";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextResponse } from "next/server";
import { z } from "zod";

export const dynamic = "force-dynamic";

/**
 * @description Retrieve user vehicles
 */
export const GET = auth(
  withJWTAuthAndVoucherHandler(logger)(
    async (_request: Request, { additionalDataJWS, user, voucher }) => {
      try {
        const res = await retrieveVehicles(
          additionalDataJWS,
          voucher.access_token,
          user.fiscalCode,
        );

        const vehicles = z.array(Veicolo).safeParse(res);

        if (vehicles.success) {
          return NextResponse.json(vehicles.data);
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

        return handleInternalErrorResponse("VehiclesRetrieveError", res);
      } catch (error) {
        logger.error(
          `An Error has occurred while retrieving user vehicles, caused by: `,
          { error },
        );
        return handleInternalErrorResponse("VehiclesRetrieveError", error);
      }
    },
  ),
);
