import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SectionTitle, SectionTitleProps } from "../SectionTitle";

const defaultProps: SectionTitleProps = {
  icon: "car1",
  label: "FT 561 YC",
};

describe("Test SectionTitle Components", () => {
  it("Should match the snapshot with default props", () => {
    const comp = render(<SectionTitle {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });

  it("Should match the snapshot for loading", () => {
    const comp = render(<SectionTitle isLoading={true} />);
    expect(comp).toMatchSnapshot();
  });
});
