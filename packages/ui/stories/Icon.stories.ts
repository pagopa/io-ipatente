import type { Meta, StoryObj } from "@storybook/react";

import { Icon } from "../lib/components/icon";

const meta = {
  title: "Components/Icons",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "airplane",
    fontSize: "large",
  },
};
