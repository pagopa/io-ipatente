import type { Meta, StoryObj } from "@storybook/react";

import { Cached } from "@mui/icons-material";
import { IllusError } from "@pagopa/mui-italia";
import React from "react";

import { OperationResult } from "../lib/components/operation-result";

const meta = {
  component: OperationResult,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/OperationResult",
} satisfies Meta<typeof OperationResult>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: {
      endIcon: <Cached />,
      label: "Ricarica",
      onClick: () => 0,
    },
    description:
      "A causa di un errore del sistema non è possibile visualizzare la pagina. Ti chiediamo di riprovare più tardi.",
    illustration: <IllusError />,
    title: "Qualcosa è andato storto",
  },
};
