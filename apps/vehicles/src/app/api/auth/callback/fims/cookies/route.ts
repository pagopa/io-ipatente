import { AuthCallback } from "@io-ipatente/core";

import { logger } from "@/lib/bff/logger";

export const { GET } = AuthCallback(logger).handlers;
