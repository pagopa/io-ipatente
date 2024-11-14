import { Checkbox } from "@mui/material";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Column, Table } from "../Table";

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

describe("Test Table Components", () => {
  it("Should match the snapshot with default props", () => {
    const comp = render(<Table columns={columns} rows={rows} />);
    expect(comp).toMatchSnapshot();
  });
});
