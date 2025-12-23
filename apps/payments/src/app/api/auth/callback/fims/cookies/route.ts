import { logger } from "@/lib/bff/logger";
import { AuthCallback } from "@io-ipatente/core";

export const { GET } = AuthCallback(logger).handlers;
