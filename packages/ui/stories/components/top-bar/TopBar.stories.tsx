import type { Meta, StoryObj } from "@storybook/react";

import { TopBar } from "../../../lib/components/top-bar";

const meta = {
  title: "Components/TopBar",
  component: TopBar,
  tags: ["autodocs"],
  argTypes: {
    contextualHelp: {
      control: "object",
      if: { arg: "enableAssistance" },
    },
  },
  args: {
    contextualHelp: {
      title: "Assistenza",
      onAssistanceClick: () => {},
    },
  },
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
    enableAssistance: false,
  },
};

export const WithAssistance: Story = {
  args: {
    product: {
      logo: "ipatente",
      url: "",
      name: "Il portale dell'automobilista",
    },
    enableAssistance: true,
    contextualHelp: {
      title: "Assistenza",
      onAssistanceClick: () => {},
    },
  },
};
