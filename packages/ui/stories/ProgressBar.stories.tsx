import type { Meta, StoryObj } from "@storybook/react";

import { Stack } from "@mui/material";
import React from "react";

import { ProgressBar, ProgressBarProps } from "../lib/components/progress-bar";

const Container = (props: ProgressBarProps) => (
  <Stack minWidth={200}>
    <ProgressBar {...props} />
  </Stack>
);

const meta = {
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  render: (props) => <Container {...props} />,
  tags: ["autodocs"],
  title: "Components/ProgressBar",
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description: "10 of 20",
    title: "Example",
    total: 20,
    value: 10,
  },
};
