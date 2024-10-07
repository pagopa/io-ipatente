import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Icon } from "../Icon";

describe("Test Icon Components", () => {
  it("Should match the snapshot", () => {
    const comp = render(<Icon name="airplane" />);
    expect(comp).toMatchSnapshot();
  });
});
