import type { Meta, StoryObj } from "@storybook/react";

import { EmptyState } from "../lib/components/empty-state";

const meta = {
  component: EmptyState,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/EmptyState",
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "airplane",
    title: "Empty state example",
  },
};
