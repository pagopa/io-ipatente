import { CoreLogger, createLogger } from "@io-ipatente/core";
import pino, { LoggerOptions, Logger as PinoLogger } from "pino";

// Base configuration for Pino
const baseConfig: LoggerOptions = {
  level: process.env.LOG_LEVEL ?? "info",
  // Enable standard serialization for Error objects
  serializers: {
    error: pino.stdSerializers.err,
  },
  // Timestamp format compliant with ISO8601
  timestamp: pino.stdTimeFunctions.isoTime,
};

let pinoLoggerInstance: PinoLogger | null = null;
const getPinoInstance = (): PinoLogger =>
  pinoLoggerInstance ?? (pinoLoggerInstance = pino(baseConfig));

/**
 * `CoreLogger` instance using the factory from the core package.
 */
export const logger: CoreLogger = createLogger(getPinoInstance());
