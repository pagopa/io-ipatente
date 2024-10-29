import { Veicolo } from "@/generated/openapi";
import { retrieveVehicles } from "@/lib/bff/business";
import {
  handleBadRequestErrorResponse,
  handleInternalErrorResponse,
} from "@/lib/bff/errors";
import { withJWTAuthAndVoucherHandler } from "@/lib/bff/with-jwt-auth-voucher-handler";
import { Voucher } from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { CustomUser } from "../../../../types/next-auth";

/**
 * @description Retrieve user vehicles
 */
export const GET = withJWTAuthAndVoucherHandler(
  async (
    request: NextRequest,
    { user, voucher }: { user: CustomUser; voucher: Voucher },
  ) => {
    try {
      const res = await retrieveVehicles(voucher.access_token, user.fiscalCode);
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
      // eslint-disable-next-line no-console
      console.error(
        `An Error has occurred while retrieving user vehicles, caused by: `,
        error,
      );
      return handleInternalErrorResponse("VehiclesRetrieveError", error);
    }
  },
);
