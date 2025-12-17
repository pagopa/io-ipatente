import { Patenti } from "@/generated/bff-openapi";
import { ManagedInternalError } from "@io-ipatente/core";
import { ZodiosError } from "@zodios/core";
import { AxiosError } from "axios";

import { getExternalApiClient } from "./client";

export const retrieveLicences =
  () =>
  async (additionalDataJWS: string, token: string, fiscalCode: string) => {
    try {
      // TEST: Simula errore DG_MOT
      if (process.env.FORCE_DG_MOT_ERROR === "true") {
        throw new AxiosError("DG_MOT server error (test mode)");
      }

      const response = await getExternalApiClient().getPuntiPatente({
        headers: {
          "Agid-JWT-TrackingEvidence": additionalDataJWS,
          Authorization: `Bearer ${token}`,
          codiceFiscale: fiscalCode,
        },
      });

      const licences = Patenti.safeParse(response);

      if (!licences.success) {
        throw new ManagedInternalError(
          "[DG_MOT] Validation failed: Invalid licence data from DG_MOT",
          licences.error,
        );
      }

      return licences.data;
    } catch (error) {
      if (error instanceof ManagedInternalError) {
        throw error;
      }

      if (error instanceof ZodiosError) {
        throw new ManagedInternalError("[DG_MOT] Failed zod validation", error);
      }

      throw new ManagedInternalError(
        "[DG_MOT] Failed to retrieve licences",
        error,
      );
    }
  };
