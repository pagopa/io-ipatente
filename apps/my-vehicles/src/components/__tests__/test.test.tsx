import "@testing-library/jest-dom";
import { cleanup, render } from "@testing-library/react";
import { afterEach, expect, it } from "vitest";

import { TestComponent } from "../TestComponent";

// needed to clean document (react dom)
afterEach(cleanup);

it("[Frontend] it works", () => {
  render(TestComponent());

  expect(document.getElementById("test-component")).toBeInTheDocument();
  expect(document.getElementById("another-component")).not.toBeInTheDocument();
});
