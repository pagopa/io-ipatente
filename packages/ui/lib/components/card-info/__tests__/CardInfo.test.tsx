import CheckCircle from "@mui/icons-material/CheckCircle";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import Chip from "@mui/material/Chip";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CardInfo } from "../CardInfo";

const bottomContent = (
  <div data-testid="sample-bottom-content">bottom-content</div>
);
const topContent = <div data-testid="sample-top-content">top-content</div>;
const icon = <VerifiedUser fontSize="inherit" />;
const title = "sample-title";
const items = [
  { label: "label-1", value: "value-1" },
  {
    label: "label-2",
    value: (
      <Chip
        color="success"
        icon={<CheckCircle />}
        label="custom-label"
        size="small"
      />
    ),
  },
  {
    footerText: "sample-footer-text",
    label: "label-3",
    value: "value-3",
  },
];

describe("Test CardInfo Component", () => {
  it("Should match the snapshot with all props", () => {
    const comp = render(
      <CardInfo
        bottomContent={bottomContent}
        icon={icon}
        items={items}
        title={title}
        topContent={topContent}
      />,
    );
    expect(comp).toMatchSnapshot();
  });
});
