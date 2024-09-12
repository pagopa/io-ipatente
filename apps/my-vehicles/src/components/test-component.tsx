import { getConfiguration } from "@/config";

/**
 * Test purpose react component
 * Used to check vitest correct behaviour (especially for aliases)
 **/
export const TestComponent = () => {
  const x = getConfiguration().IS_BROWSER;
  return <div id="test-component">{x}</div>;
};
