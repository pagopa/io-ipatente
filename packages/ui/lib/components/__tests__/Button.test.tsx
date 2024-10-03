import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";

import UIButton from "../Button";

it("[UIButton] Should render button with defined label", () => {
  const label = "test-label";
  const dataTestId = "io-ipatente-button";

  render(<UIButton label={label} onClick={() => 0} />);

  const button = screen.getByTestId(dataTestId);

  expect(button).toBeInTheDocument();
  expect(button).toHaveTextContent(label);
});
