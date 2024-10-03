import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { UIPageHeader } from "../lib/components/page-header";

const meta = {
  title: "Components/UIPageHeader",
  component: UIPageHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onBreadcrumbClick: fn() },
} satisfies Meta<typeof UIPageHeader>;

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
