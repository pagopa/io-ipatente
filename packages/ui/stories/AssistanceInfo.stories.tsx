import type { Meta, StoryObj } from "@storybook/react";

import { AssistanceInfo } from "../lib/components/assistance-info";

const meta = {
  component: AssistanceInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/AssistanceInfo",
} satisfies Meta<typeof AssistanceInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
    phone: "800 23 23 23",
    title: "Assistance Info Example",
  },
};
