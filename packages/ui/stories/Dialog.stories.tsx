import type { Meta, StoryObj } from "@storybook/react";

import { ButtonBase, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";

import { Icon } from "../lib/components/icon";
import { Dialog, DialogProps } from "../lib/components/dialog";

const Container = (props: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ButtonBase onClick={() => setIsOpen(true)}>Open Modal</ButtonBase>
      <Dialog {...props} onClose={() => setIsOpen(false)} open={isOpen} />
    </>
  );
};

const meta = {
  component: Dialog,
  parameters: {
    layout: "padded",
  },
  render: (props) => <Container {...props} />,
  tags: ["autodocs"],
  title: "Components/Dialog",
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
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
    title: "Dialog title",
    open: false,
  },
};
