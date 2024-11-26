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
    items: [
      {
        title: "Email",
        icon: "mailSendBold",
        contacts: [
          {
            value: "info@email.com",
            href: "mailto:info@email.com",
          },
        ],
      },
      {
        contacts: [
          {
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            value: "800 10 10 10",
            href: "tel:800101010",
          },
          {
            description:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
            value: "800 23 23 23",
            href: "tel:800232323",
          },
        ],
        title: "Phone",
        icon: "callBold",
      },
    ],
  },
};
