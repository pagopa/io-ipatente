import type { Meta, StoryObj } from "@storybook/react";
import { CardCarousel } from "../lib/components/card-carousel";
import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const meta = {
  title: "Components/CardCarousel",
  component: CardCarousel,
  parameters: {
    layout: "padded",
  },
  subcomponents: {
    "CardCarousel.Item": CardCarousel.Item as React.ComponentType<unknown>,
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CardCarousel>;

export default meta;
type Story = StoryObj<typeof meta>;

const Content = () => (
  <List
    sx={{
      width: "100%",
      bgcolor: "background.paper",
    }}
  >
    <ListItem>
      <ListItemText primary="Label" secondary="Value" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Label" secondary="Value" />
    </ListItem>
    <ListItem>
      <ListItemText primary="Label" secondary="Value" />
    </ListItem>
  </List>
);

export const Default: Story = {
  args: {
    children: Array.from({ length: 3 }).map((_, index) => (
      <CardCarousel.Item key={`slide-${index}`}>
        <Content />
      </CardCarousel.Item>
    )),
    icon: "documentText",
    title: "Storico Revisioni",
  },
};
