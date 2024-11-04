import type { Meta, StoryObj } from "@storybook/react";

import { ButtonBase, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useState } from "react";

import { Icon } from "../lib/components/icon";
import { Modal } from "../lib/components/modal";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Container = (props: any) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <ButtonBase onClick={() => setOpen(true)}>Open Modal</ButtonBase>
      <Modal {...props} close={() => setOpen(false)} open={open} />
    </div>
  );
};

const meta = {
  component: Container,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  title: "Components/Modal",
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const Body = () => (
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

export const Default: Story = {
  args: {
    body: <Body />,
    close: () => null,
    title: "Modal Story",
  },
};
