import type { Meta, StoryObj } from "@storybook/react";
import { ListItemAction } from "../lib/components/list-item-action";

const meta = {
  title: "Components/ListItemAction",
  component: ListItemAction,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ListItemAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    badges: [
      {
        color: "success",
        icon: "tickCircleBold",
        label: "custom-label",
        size: "small",
      },
      {
        color: "warning",
        icon: "warningBold",
        label: "custom-label-test",
        size: "small",
      },
      {
        color: "error",
        icon: "warning2Bold",
        label: "custom-label",
        size: "small",
      },
    ],
    icon: "car1",
    label: "Autoveicolo",
    onClick: () => {},
    value: "FT 561 YC",
  },
};

export const isLoading: Story = {
  args: {
    isLoading: true,
  },
};
