import type { Meta, StoryObj } from "@storybook/react";

import { TopBar } from "../lib/components/top-bar";

const meta = {
  component: TopBar,
  tags: ["autodocs"],
  title: "Components/TopBar",
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      logo: "ipatente",
      name: "Il portale dell'automobilista",
      url: "",
    },
  },
};

export const WithAssistance: Story = {
  args: {
    assistance: {
      label: "Example",
      onClick: () => null,
    },
    product: {
      logo: "ipatente",
      name: "Il portale dell'automobilista",
      url: "",
    },
  },
};
