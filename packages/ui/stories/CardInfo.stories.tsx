import type { Meta, StoryObj } from "@storybook/react";

import CheckCircle from "@mui/icons-material/CheckCircle";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Chip from "@mui/material/Chip";
import React from "react";

import { CardInfo } from "../lib/components/card-info";

const meta = {
  component: CardInfo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/CardInfo",
} satisfies Meta<typeof CardInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <VerifiedUser fontSize="inherit" />,
    items: [
      { label: "Label", value: "sample text value" },
      {
        label: "Sample custom value",
        value: (
          <Chip
            color="success"
            icon={<CheckCircle />}
            label="custom chip with icon"
            size="small"
          />
        ),
      },
      {
        footerText:
          "This is a sample footer text <strong>with html render</strong>.",
        label: "Sample label 3",
        value: "value 3",
      },
    ],
    title: "Sample Title",
  },
};
