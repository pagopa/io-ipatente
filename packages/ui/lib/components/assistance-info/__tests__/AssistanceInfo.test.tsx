import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AssistanceInfo } from "../AssistanceInfo";

describe("Test AssistanceInfo Component", () => {
  it("Should match the snapshot", () => {
    const comp = render(
      <AssistanceInfo
        description="test description"
        phone="800 900 000"
        title="Non sono presenti veicoli registrati"
      />,
    );
    expect(comp).toMatchSnapshot();
  });
});
