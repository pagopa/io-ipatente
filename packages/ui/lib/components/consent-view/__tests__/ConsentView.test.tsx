import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ConsentView, ConsentViewProps } from "../ConsentView";

const mockConsentClick = vi.fn();
const mockDissentClick = vi.fn();

const defaultProps: ConsentViewProps = {
  description: "description",
  moreInfo: "more-info-text",
  primaryActionProps: {
    onClick: mockConsentClick,
    value: "consent-label",
  },
  requiredData: {
    data: ["required-data-1", "required-data-2", "required-data-3"],
    title: "required-data-title",
  },
  secondaryActionProps: {
    onClick: mockDissentClick,
    value: "dissent-label",
  },
  title: "title",
};

describe("Test ConsentView Component", () => {
  it("Should match the snapshot with all props", () => {
    const comp = render(<ConsentView {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });

  it("Should call onClick when the action buttons are clicked", async () => {
    const comp = render(<ConsentView {...defaultProps} />);

    const consentButton = comp.getByRole("button", {
      name: /consent-label/i,
    });
    const dissentButton = comp.getByRole("button", {
      name: /dissent-label/i,
    });

    fireEvent.click(consentButton);
    fireEvent.click(dissentButton);

    expect(mockConsentClick).toHaveBeenCalledTimes(1);
    expect(mockDissentClick).toHaveBeenCalledTimes(1);
  });
});
