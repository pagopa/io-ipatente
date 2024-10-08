import type { Meta, StoryObj } from "@storybook/react";
import { ListeItemAction } from "../lib/components/list-item-action";
import { CheckCircle } from "@mui/icons-material";
import React from "react";

const meta = {
  title: "Components/ListItemAction",
  component: ListeItemAction,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ListeItemAction>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    chips: [
      {
        color: "success",
        icon: <CheckCircle />,
        label: "custom-label-test",
        size: "small",
      },
      {
        color: "success",
        icon: <CheckCircle />,
        label: "custom-label",
        size: "small",
      },
      {
        color: "success",
        icon: <CheckCircle />,
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
