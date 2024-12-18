import type { Meta, StoryObj } from "@storybook/react";

import { TopBar } from "../lib/components/top-bar";

const meta = {
  component: TopBar,
  tags: ["autodocs"],
  title: "Components/TopBar",
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithAssistance: Story = {
  args: {
    assistance: {
      label: "Example",
      onClick: () => null,
    },
  },
};
