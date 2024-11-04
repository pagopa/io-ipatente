import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icon } from "../../icon";
import { Modal } from "../Modal";

const close = () => null;
const body = (
  <Stack p={2}>
    <Stack alignItems="center" sx={{ marginBottom: 2 }}>
      <Icon fontSize="large" name="success" />
    </Stack>
    <Typography textAlign="center" variant="body1">
      {
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      }
    </Typography>
  </Stack>
);
const title = "Modal Test";

describe("Test Modal Component", () => {
  it("Should match the snapshot with all props", () => {
    const comp = render(<Modal body={body} close={close} open title={title} />);
    expect(comp).toMatchSnapshot();
  });
});
