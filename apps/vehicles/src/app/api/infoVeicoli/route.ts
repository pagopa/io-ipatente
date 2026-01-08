import { auth } from "@/auth";
import { Veicolo } from "@/generated/bff-openapi";
import { retrieveVehicles } from "@/lib/bff/business";
import { logger } from "@/lib/bff/logger";
import {
  BffError,
  handleInternalErrorResponse,
  handlerErrorLog,
  withJWTAuthAndVoucherHandler,
} from "@io-ipatente/core";
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

        if (!vehicles.success) {
          throw new BffError(
            "Validation failed: Invalid vehicles data from DG_MOT",
            vehicles.error,
          );
        }
        return NextResponse.json(vehicles.data);
      } catch (error) {
        handlerErrorLog(logger)(
          "An Error has occurred while retrieving user vehicles",
          error,
        );

        return handleInternalErrorResponse("VehiclesRetrieveError", error);
      }
    },
  ),
);
