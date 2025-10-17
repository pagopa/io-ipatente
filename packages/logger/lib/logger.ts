import { CoreLogger } from "@io-ipatente/core";
import pino, { LoggerOptions, Logger as PinoLogger } from "pino";

// Configurazione base per Pino
const baseConfig: LoggerOptions = {
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  // Enable standard serialization for Error objects
  serializers: {
    error: pino.stdSerializers.err,
  },
  // Timestamp format compliant with ISO8601
  timestamp: pino.stdTimeFunctions.isoTime,
};

const pinoLoggerInstance: PinoLogger = pino(baseConfig);

/**
 * Wrapper that adapts the Pino instance to the CoreLogger interface.
 */
export const logger: CoreLogger = {
  debug: (message, context) => pinoLoggerInstance.debug(context, message),
  error: (messageOrError, context) => {
    // Handle both string messages and Error objects
    if (messageOrError instanceof Error) {
      pinoLoggerInstance.error(
        context ? { ...context, err: messageOrError } : { err: messageOrError },
        messageOrError.message,
      );
    } else {
      pinoLoggerInstance.error(context, messageOrError);
    }
  },
  info: (message, context) => pinoLoggerInstance.info(context, message),
  warn: (message, context) => pinoLoggerInstance.warn(context, message),
};
