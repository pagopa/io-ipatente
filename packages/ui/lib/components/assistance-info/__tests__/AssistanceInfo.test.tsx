import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AssistanceInfo, AssistanceInfoProps } from "../AssistanceInfo";

const defaultProps: AssistanceInfoProps = {
  items: [
    {
      contacts: [
        {
          href: "mailto:info@email.com",
          icon: "mailSendBold",
          title: "Email",
          value: "info@email.com",
        },
      ],
    },
    {
      contacts: [
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
          href: "tel:800101010",
          icon: "callBold",
          title: "Phone 1",
          value: "800 10 10 10",
        },
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
          href: "tel:800232323",
          icon: "callBold",
          title: "Phone 2",
          value: "800 23 23 23",
        },
      ],
    },
  ],
};

describe("Test AssistanceInfo Component", () => {
  it("Should match the snapshot", () => {
    const comp = render(<AssistanceInfo {...defaultProps} />);
    expect(comp).toMatchSnapshot();
  });
});
