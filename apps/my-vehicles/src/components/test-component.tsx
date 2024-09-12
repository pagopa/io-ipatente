// Used to check vitest correct behaviour on aliases
import { getConfiguration } from "@/config";

/**
 * Test purpose react component
 **/
export const TestComponent = () => {
  const isBrowser = getConfiguration().IS_BROWSER;
  return <div id="test-component">{isBrowser}</div>;
};
