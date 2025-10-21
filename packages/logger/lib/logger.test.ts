import type { Logger as PinoLogger } from "pino";

import pino from "pino";
import { Mocked, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("pino", async (importOriginal) => {
  const originalPino = await importOriginal<typeof pino>();

  const pinoMockInstance = {
    debug: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
  };

  const pinoMockFactory = vi.fn(() => pinoMockInstance);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (pinoMockFactory as any).stdSerializers = originalPino.stdSerializers;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (pinoMockFactory as any).stdTimeFunctions = originalPino.stdTimeFunctions;

  return {
    default: pinoMockFactory,
  };
});

const { logger } = await import("./logger");
const pinoLoggerInstance = pino() as unknown as Mocked<PinoLogger>;

describe("Logger", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should call pino info with context and message", () => {
    const message = "This is an info message";
    const context = { action: "login", userId: 123 };

    logger.info(message, context);

    expect(pinoLoggerInstance.info).toHaveBeenCalledOnce();
    expect(pinoLoggerInstance.info).toHaveBeenCalledWith(context, message);
  });

  it("should call pino debug with context and message", () => {
    const message = "Debugging a process";
    const context = { processId: "abc-xyz" };

    logger.debug(message, context);

    expect(pinoLoggerInstance.debug).toHaveBeenCalledOnce();
    expect(pinoLoggerInstance.debug).toHaveBeenCalledWith(context, message);
  });

  it("should call pino warn with context and message", () => {
    const message = "Warning: resource usage is high";
    const context = { memoryUsage: "90%" };

    logger.warn(message, context);

    expect(pinoLoggerInstance.warn).toHaveBeenCalledOnce();
    expect(pinoLoggerInstance.warn).toHaveBeenCalledWith(context, message);
  });

  describe("error", () => {
    it("should call pino error with a string message and context", () => {
      const errorMessage = "A simple error occurred";
      const context = { errorCode: 500 };

      logger.error(errorMessage, context);

      expect(pinoLoggerInstance.error).toHaveBeenCalledOnce();
      expect(pinoLoggerInstance.error).toHaveBeenCalledWith(
        context,
        errorMessage,
      );
    });

    it("should call pino error correctly when given an Error object", () => {
      const error = new Error("Something went wrong");
      const context = { requestId: "req-123" };

      logger.error(error, context);

      expect(pinoLoggerInstance.error).toHaveBeenCalledOnce();
      expect(pinoLoggerInstance.error).toHaveBeenCalledWith(
        expect.objectContaining({
          ...context,
          err: error,
        }),
        error.message,
      );
    });

    it("should handle an Error object without additional context", () => {
      const error = new Error("Standalone error");

      logger.error(error);

      expect(pinoLoggerInstance.error).toHaveBeenCalledOnce();
      expect(pinoLoggerInstance.error).toHaveBeenCalledWith(
        { err: error },
        error.message,
      );
    });
  });
});
