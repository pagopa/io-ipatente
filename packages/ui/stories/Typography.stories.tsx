import type { Meta, StoryObj } from "@storybook/react";

import { TypographyTable } from "../lib/components/typography";
import { THEME_VARIANTS } from "../lib/components/typography";

const meta = {
  component: TypographyTable,
  tags: ["autodocs"],
  title: "Foundation/Typography",
} satisfies Meta<typeof TypographyTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: THEME_VARIANTS,
    },
  },
  args: {
    children: "Default Typography Component",
    variant: "body1",
  },
};
