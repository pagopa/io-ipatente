import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "../Logo";

describe("Test LogoIPatente Components", () => {
  it("LogoIPatente Snapshot", () => {
    const comp = render(<Logo name="ipatente" />);
    expect(comp).toMatchSnapshot();
  });
});
