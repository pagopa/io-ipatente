import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CardCarousel } from "../CardCarousel";

describe("Test CardCarousel Components", () => {
  it("Should match the snapshot", () => {
    const comp = render(
      <CardCarousel icon="car1" title="Autoveicolo">
        {Array.from({ length: 3 }).map((_, index) => (
          <CardCarousel.Item key={`slide-${index}`}>
            <div>Content {index}</div>
          </CardCarousel.Item>
        ))}
      </CardCarousel>,
    );
    expect(comp).toMatchSnapshot();
  });
});
