import type { Meta, StoryObj } from "@storybook/react";

import { FloatingButton } from "../lib/components/floating-button";

const sizeOptions = ["small", "medium", "large"];
const colorOptions = [
  "success",
  "error",
  "info",
  "warning",
  "default",
  "inherit",
  "primary",
  "secondary",
];

const meta = {
  argTypes: {
    color: {
      control: { type: "select" },
      options: colorOptions,
    },
    disabled: {
      type: "boolean",
    },
    onClick: {
      description: "The function called at the onClick event",
      type: "function",
    },
    size: {
      control: { type: "select" },
      description: "Controls the size of the floating button",
      options: sizeOptions,
    },
  },
  component: FloatingButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/FloatingButton",
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    color: "secondary",
    icon: "expandUp",
    label: "ciao",
    onClick: () => null,
    size: "small",
  },
};
