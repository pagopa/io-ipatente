import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "@mui/material";
import React from "react";

import { Column, Table } from "../lib/components/table";

interface Row {
  test_1: string;
  test_2: number;
  test_3: boolean;
}

const rows = [
  {
    test_1: "Simple string",
    test_2: 10,
    test_3: true,
  },
  {
    test_1: "Simple string 2",
    test_2: 20,
    test_3: false,
  },
];

const columns: Column<Row>[] = [
  {
    key: "test_1",
    title: "test_1",
    widthFactor: 0.4,
  },
  {
    key: "test_2",
    title: "test_2",
    widthFactor: 0.2,
  },
  {
    key: "test_3",
    render: (_, item) => <Checkbox defaultChecked={item.test_3} />,
    title: "test_3",
  },
];

const meta = {
  component: Table,
  tags: ["autodocs"],
  title: "Components/Table",
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns: columns as Column<unknown>[],
    rows,
  },
};
