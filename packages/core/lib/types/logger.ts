/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * CoreLogger interface defines the structure for logging methods.
 */
export interface CoreLogger {
  debug: (message: string, context?: Record<string, any>) => void;
  error: (message: Error | string, context?: Record<string, any>) => void;
  info: (message: string, context?: Record<string, any>) => void;
  warn: (message: string, context?: Record<string, any>) => void;
}
