import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EmptyState } from "../EmptyState";

describe("Test EmptyState Component", () => {
  it("Should match the snapshot", () => {
    const comp = render(
      <EmptyState
        icon="car1Bold"
        title="Non sono presenti veicoli registrati"
      />,
    );
    expect(comp).toMatchSnapshot();
  });
});
