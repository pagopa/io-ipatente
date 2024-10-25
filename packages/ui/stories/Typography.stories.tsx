import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "@mui/material";

import { theme } from "../lib/theme";

const variantsOptions = Object.entries(theme.typography).reduce<string[]>(
  (acc, [key, value]) => {
    if (key !== "allVariants" && value && typeof value === "object") {
      return [...acc, key];
    }
    return acc;
  },
  [],
);

const metadata = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  component: Typography,
  tags: ["autodocs"],
  title: "Foundation/Typography",
} as Meta<typeof Typography>;

export default metadata;

type Story = StoryObj<typeof metadata>;

export const H1: Story = {
  args: {
    children: "H1 component",
    variant: "h1",
  },
};

export const H2: Story = {
  args: {
    children: "H2 component",
    variant: "h2",
  },
};

export const H3: Story = {
  args: {
    children: "H3 component",
    variant: "h3",
  },
};

export const H4: Story = {
  args: {
    children: "H4 component",
    variant: "h4",
  },
};

export const H5: Story = {
  args: {
    children: "H3 component",
    variant: "h5",
  },
};

export const H6: Story = {
  args: {
    children: "H3 component",
    variant: "h6",
  },
};

export const Subtitle1: Story = {
  args: {
    children: "Subtitle 1 component",
    variant: "subtitle1",
  },
};

export const Subtitle2: Story = {
  args: {
    children: "Subtitle 2 component",
    variant: "subtitle2",
  },
};

export const Body1: Story = {
  args: {
    children: "Body 1 component",
    variant: "body1",
  },
};

export const Body2: Story = {
  args: {
    children: "Body 2 component",
    variant: "body2",
  },
};

export const Caption: Story = {
  args: {
    children: "Caption component",
    variant: "caption",
  },
};

export const Overline: Story = {
  args: {
    children: "Overline component",
    variant: "overline",
  },
};

export const Inherit: Story = {
  args: {
    children: "Inherit component",
    variant: "inherit",
  },
};

export const Headline: Story = {
  args: {
    children: "Headline component",
    variant: "headline",
  },
};

export const Sidenav: Story = {
  args: {
    children: "Sidenav component",
    variant: "sidenav",
  },
};

export const CapitionSemibold: Story = {
  args: {
    children: "Caption semibold component",
    variant: "caption-semibold",
  },
};
