import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";

import { PageHeader } from "../lib/components/page-header";

const meta = {
  argTypes: {},
  args: { onBreadcrumbClick: fn() },
  component: PageHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/PageHeader",
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MainPage: Story = {
  args: {
    description: "This is a sample description.",
    title: "Sample Title",
  },
};

export const DetailsPage: Story = {
  args: {
    breadcrumbs: [
      {
        label: "Root label",
        routePath: "/root-path",
      },
      {
        label: "Leaf label",
      },
    ],
    title: "Sample Title",
  },
};

export const BackPage: Story = {
  args: {
    backLabel: "Back",
    description: "This is a sample description.",
    onBackClick: () => null,
    title: "Sample Title",
  },
};
