import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "../Logo";

describe("Test LogoIPatente Components", () => {
  it("Should match the snapshot", () => {
    const comp = render(<Logo name="ipatente" />);
    expect(comp).toMatchSnapshot();
  });
});
