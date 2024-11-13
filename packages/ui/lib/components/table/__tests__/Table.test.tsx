import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Table, TableProps } from "../Table";

const defaultProps: TableProps = {
  columns: ["header-1", "header-2"],
  rows: [
    {
      date: "01/01/1970",
      detail: "Test",
      key: "Test-01/01/1970",
      variation: 3,
    },
    {
      date: "02/01/1970",
      detail: "Test_Error",
      key: "Test_Error-02/01/1970",
      variation: -3,
    },
  ],
};

describe("Test SectionTitle Components", () => {
  it("Should match the snapshot with default props", () => {
    const comp = render(<Table {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });
});
