import type { Meta, StoryObj } from "@storybook/react";

import { TopBar } from "../../../lib/components/top-bar";

const meta = {
  title: "Components/TopBar",
  component: TopBar,
  tags: ["autodocs"],
} satisfies Meta<typeof TopBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    product: {
      logo: "ipatente",
      url: "",
      name: "Il portale dell'automobilista",
    },
  },
};

export const WithAssistance: Story = {
  args: {
    product: {
      logo: "ipatente",
      url: "",
      name: "Il portale dell'automobilista",
    },
    assistance: {
      label: "Assistenza",
      onClick: () => {},
    },
  },
};
