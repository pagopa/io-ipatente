import { Cached } from "@mui/icons-material";
import { IllusError } from "@pagopa/mui-italia";
import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  DATA_TEST_ID_OPERATION_RESULT_PREFIX,
  OperationResult,
} from "../OperationResult";

const mockHandleClick = vi.fn();

const action = {
  endIcon: <Cached />,
  label: "action-label",
  onClick: mockHandleClick,
};
const description = "sample-description";
const illustration = <IllusError />;
const title = "sample-title";

describe("Test OperationResult Component", () => {
  it("Should match the snapshot with all props", () => {
    const comp = render(
      <OperationResult
        action={action}
        description={description}
        illustration={illustration}
        title={title}
      />,
    );
    expect(comp).toMatchSnapshot();
  });

  it("Should call onClick when the action button is clicked", async () => {
    const comp = render(
      <OperationResult
        action={action}
        description={description}
        illustration={illustration}
        title={title}
      />,
    );

    const actionButton = await comp.findByTestId(
      `${DATA_TEST_ID_OPERATION_RESULT_PREFIX}-action`,
    );
    fireEvent.click(actionButton);
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });
});
