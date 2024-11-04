import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icon } from "../../icon";
import { Dialog, DialogProps } from "../Dialog";

const defaultProps: DialogProps = {
  body: (
    <Stack spacing={3}>
      <Stack alignItems="center">
        <Icon fontSize="large" name="success" />
      </Stack>
      <Typography textAlign="center" variant="body1">
        {
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        }
      </Typography>
    </Stack>
  ),
  onClose: () => null,
  open: true,
  title: "Dialog Test",
};

describe("Test Dialog Component", () => {
  it("Should match the snapshot with all props", () => {
    const comp = render(<Dialog {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });
});
