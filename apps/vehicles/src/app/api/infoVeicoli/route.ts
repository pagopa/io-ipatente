import { retrieveVehicles } from "@/lib/bff/business";
import { handleInternalErrorResponse } from "@/lib/bff/errors";
import { withJWTAuthHandler } from "@/lib/bff/wrappers";
import { NextRequest, NextResponse } from "next/server";

import { CustomUser } from "../../../../types/next-auth";

/**
 * @description Retrieve user vehicles
 */
export const GET = withJWTAuthHandler(
  async (request: NextRequest, { user }: { user: CustomUser }) => {
    try {
      const res = await retrieveVehicles(user.fiscalCode);
      return NextResponse.json(res);
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
