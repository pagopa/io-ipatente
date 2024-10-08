import type { Meta, StoryObj } from "@storybook/react";
import { SectionTitle } from "../lib/components/section-title";
import { CheckCircle } from "@mui/icons-material";
import React from "react";

const meta = {
  title: "Components/SectionTitle",
  component: SectionTitle,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: "car1",
    label: "FT 561 YC",
  },
};
