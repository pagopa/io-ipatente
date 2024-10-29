import { NextResponse } from "next/server";

const MAX_RETRIES = 5;

/**
 *
 * @param fn api caller function
 * @param args list of function arguments - never [ ]
 * @param failuresCallback callback triggered after reaches max retries (5)
 * @returns Promise<Awaited<ReturnType<typeof fn>>>
 */

export const withRetries = async <R>(
  fn: (...args: never[]) => Promise<R | null>,
  args: never[],
  failuresCallback?: () => NextResponse<unknown>,
  retries?: number,
): Promise<Awaited<ReturnType<typeof fn>>> => {
  const currentRetry = retries ?? 1;
  try {
    const result = await fn(...args);
    return result;
  } catch (error) {
    if (currentRetry >= MAX_RETRIES) {
      if (failuresCallback) failuresCallback?.();
      return null;
    }
    return withRetries(fn, args, failuresCallback, currentRetry + 1);
  }
};
