import type { Meta, StoryObj } from "@storybook/react";

import { PageHeader } from "../lib/components/page-header";

const meta = {
  component: PageHeader,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  title: "Components/PageHeader",
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Sample Title",
  },
};

export const WithBreadcrumbs: Story = {
  args: {
    title: "Sample Title",
    description: "This is a sample description",
    breadcrumbsProps: {
      breadcrumbs: [{ label: "Home", routePath: "/" }, { label: "Details" }],
    },
  },
};

export const WithBack: Story = {
  args: {
    description: "This is a sample description",
    title: "Sample Title",
    backButtonProps: {
      label: "Back",
      onBackClick: () => null,
    },
  },
};
