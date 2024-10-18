import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ListItemAction, ListItemActionProps } from "../ListItemAction";

const mockHandleClick = vi.fn();

const defaultProps: ListItemActionProps = {
  icon: "car1",
  label: "Autoveicolo",
  onClick: mockHandleClick,
  value: "FT 561 YC",
};

describe("Test ListItemAction Components", () => {
  it("Should match the snapshot with default props", () => {
    const comp = render(<ListItemAction {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });

  it("Should match the snapshot with badges", () => {
    const comp = render(
      <ListItemAction
        {...defaultProps}
        badges={[
          {
            color: "success",
            icon: "tickCircleBold",
            label: "custom-label-test",
            size: "small",
          },
        ]}
      />,
    );
    expect(comp).toMatchSnapshot();
  });

  it("Should call onClick when the item is clicked", async () => {
    const comp = render(<ListItemAction {...defaultProps} />);

    const button = await comp.findByText("Autoveicolo");
    fireEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it("Should match the snapshot for loading", () => {
    const comp = render(<ListItemAction isLoading={true} />);
    expect(comp).toMatchSnapshot();
  });
});
