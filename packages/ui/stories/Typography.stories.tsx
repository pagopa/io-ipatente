import type { Meta, StoryObj } from "@storybook/react";

import { Typography } from "@mui/material";

import { theme } from "../lib/theme";

const exludedKeys = ["allVariants"];

const variantsOptions = Object.entries(theme.typography).reduce(
  (acc, [key, value]) =>
    !exludedKeys.includes(key) &&
    value !== null &&
    typeof value === "object" &&
    !Array.isArray(value)
      ? [...acc, key]
      : acc,
  [] as string[],
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
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "H1 component",
    variant: "h1",
  },
};

export const H2: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "H2 component",
    variant: "h2",
  },
};

export const H3: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "H3 component",
    variant: "h3",
  },
};

export const H4: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "H4 component",
    variant: "h4",
  },
};

export const H5: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "H3 component",
    variant: "h5",
  },
};

export const H6: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "H3 component",
    variant: "h6",
  },
};

export const Subtitle1: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "Subtitle 1 component",
    variant: "subtitle1",
  },
};

export const Subtitle2: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "Subtitle 2 component",
    variant: "subtitle2",
  },
};

export const Body1: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "Body 1 component",
    variant: "body1",
  },
};

export const Body2: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "Body 2 component",
    variant: "body2",
  },
};

export const Caption: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "Caption component",
    variant: "caption",
  },
};

export const Overline: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "Overline component",
    variant: "overline",
  },
};

export const Inherit: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "Inherit component",
    variant: "inherit",
  },
};

export const Headline: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "Headline component",
    variant: "headline",
  },
};

export const Sidenav: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "Sidenav component",
    variant: "sidenav",
  },
};

export const CapitionSemibold: Story = {
  argTypes: {
    variant: {
      control: { type: "select" },
      options: variantsOptions,
    },
  },
  args: {
    children: "Caption semibold component",
    variant: "caption-semibold",
  },
};
