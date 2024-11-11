import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { FloatingButton } from "../FloatingButton";

const mockOnClick = vi.fn();

describe("Test FloatingButton Component", () => {
  it("Should match the snapshot", () => {
    const comp = render(
      <FloatingButton icon="airplane" onClick={mockOnClick} />,
    );
    expect(comp).toMatchSnapshot();
  });

  it("Should call onClick when FloatingButton is clicked", async () => {
    const comp = render(
      <FloatingButton icon="airplane" onClick={mockOnClick} />,
    );

    const button = await comp.findByTestId("floating-button-component");
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  it("Should render FloatingButton with label", async () => {
    const comp = render(
      <FloatingButton icon="airplane" label="Test" onClick={mockOnClick} />,
    );

    const buttonLabel = await comp.findByText("Test");

    expect(buttonLabel).toBeInTheDocument();
  });
});
