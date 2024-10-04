import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { TopBar, TopBarProps } from "../TopBar";

const mockHandleClick = vi.fn();

const defaultProps: TopBarProps = {
  product: {
    logo: "ipatente",
    name: "Il portale dell'automobilista",
    url: "",
  },
};

describe("Test TopBar Components", () => {
  it("Should match the snapshot with default props", () => {
    const comp = render(<TopBar {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });

  it("Should match the snapshot when assistance is true", () => {
    const comp = render(
      <TopBar
        {...defaultProps}
        assistance={{
          label: "Assistenza",
          onClick: mockHandleClick,
        }}
      />,
    );
    expect(comp).toMatchSnapshot();
  });

  it("Should call onClick when the assistance button is clicked", async () => {
    const comp = render(
      <TopBar
        {...defaultProps}
        assistance={{
          label: "Assistenza",
          onClick: mockHandleClick,
        }}
      />,
    );

    const button = await comp.findByText("Assistenza");
    fireEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
