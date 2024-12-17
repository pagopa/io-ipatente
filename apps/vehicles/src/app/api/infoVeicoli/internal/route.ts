import { auth } from "@/auth";
import { Veicolo } from "@/generated/bff-openapi";
import { retrieveVehicles } from "@/lib/bff/business";
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
 * @description Retrieve user vehicles
 */
export const GET = auth(
  withTestUserAndVoucherInternalHandler(
    async (_request: Request, { additionalDataJWS, testUser, voucher }) => {
      try {
        const res = await retrieveVehicles(
          additionalDataJWS,
          voucher.access_token,
          testUser,
        );

        const vehicles = z.array(Veicolo).safeParse(res);

        if (vehicles.success) {
          console.log("test-log  internal, to check ai otel working");
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

        return handleInternalErrorResponse(
          "VehiclesInternalRetrieveError",
          res,
        );
      } catch (error) {
        console.error(
          `An Error has occurred while retrieving user vehicles, caused by: `,
          error,
        );
        return handleInternalErrorResponse(
          "VehiclesInternalRetrieveError",
          error,
        );
      }
    },
  ),
);
