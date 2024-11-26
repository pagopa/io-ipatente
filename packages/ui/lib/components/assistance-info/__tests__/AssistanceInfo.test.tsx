import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AssistanceInfo, AssistanceInfoProps } from "../AssistanceInfo";

const defaultProps: AssistanceInfoProps = {
  items: [
    {
      title: "Email",
      icon: "mailSendBold",
      contacts: [
        {
          value: "info@email.com",
          href: "mailto:info@email.com",
        },
      ],
    },
    {
      contacts: [
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
          value: "800 10 10 10",
          href: "tel:800101010",
        },
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
          value: "800 23 23 23",
          href: "tel:800232323",
        },
      ],
      title: "Phone",
      icon: "callBold",
    },
  ],
};

describe("Test AssistanceInfo Component", () => {
  it("Should match the snapshot", () => {
    const comp = render(<AssistanceInfo {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });
});
