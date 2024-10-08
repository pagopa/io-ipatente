import { CheckCircle } from "@mui/icons-material";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ListItemActionProps, ListeItemAction } from "../ListItemAction";

const mockHandleClick = vi.fn();

const defaultProps: ListItemActionProps = {
  icon: "car1",
  label: "Autoveicolo",
  onClick: mockHandleClick,
  value: "FT 561 YC",
};

describe("Test ListeItemAction Components", () => {
  it("Should match the snapshot with default props", () => {
    const comp = render(<ListeItemAction {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });

  it("Should match the snapshot with chips", () => {
    const comp = render(
      <ListeItemAction
        {...defaultProps}
        chips={[
          {
            color: "success",
            icon: <CheckCircle />,
            label: "custom-label-test",
            size: "small",
          },
        ]}
      />,
    );
    expect(comp).toMatchSnapshot();
  });

  it("Should call onClick when the item is clicked", async () => {
    const comp = render(<ListeItemAction {...defaultProps} />);

    const button = await comp.findByText("Autoveicolo");
    fireEvent.click(button);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
