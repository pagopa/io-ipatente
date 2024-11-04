import { Cached } from "@mui/icons-material";
import { IllusError } from "@pagopa/mui-italia";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { OperationResult, OperationResultProps } from "../OperationResult";

const mockHandleClick = vi.fn();

const defaultProps: OperationResultProps = {
  action: {
    endIcon: <Cached />,
    label: "action-label",
    onClick: mockHandleClick,
  },
  description: "sample-description",
  illustration: <IllusError />,
  title: "sample-title",
};

describe("Test OperationResult Component", () => {
  it("Should match the snapshot with all props", () => {
    const comp = render(<OperationResult {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });

  it("Should call onClick when the action button is clicked", async () => {
    const comp = render(<OperationResult {...defaultProps} />);

    const actionButton = comp.getByRole("button", {
      name: /action-label/i,
    });
    fireEvent.click(actionButton);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
