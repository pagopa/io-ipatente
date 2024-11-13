import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ProgressBar } from "../ProgressBar";

const description = "sample-description";
const title = "sample-title";
const value = 20;
const total = 30;
const PROGRESS_BAR_TITLE_TEST_ID = "progress-bar-title";
const PROGRESS_BAR_DESCRIPTION_TEST_ID = "progress-bar-description";

describe("Test ProgressBar Component", () => {
  it("Should match the snapshot with all props", () => {
    const comp = render(
      <ProgressBar
        description={description}
        title={title}
        total={total}
        value={value}
      />,
    );
    const progressBarTitle = screen.queryByTestId(PROGRESS_BAR_TITLE_TEST_ID);
    const progressBarDescription = screen.queryByTestId(
      PROGRESS_BAR_DESCRIPTION_TEST_ID,
    );

    expect(progressBarTitle).toBeInTheDocument();
    expect(progressBarDescription).toBeInTheDocument();
    expect(comp).toMatchSnapshot();
  });
  it("Should match the snapshot without title and description", () => {
    const comp = render(<ProgressBar total={total} value={value} />);
    const progressBarTitle = screen.queryByTestId(PROGRESS_BAR_TITLE_TEST_ID);
    const progressBarDescription = screen.queryByTestId(
      PROGRESS_BAR_DESCRIPTION_TEST_ID,
    );

    expect(progressBarTitle).not.toBeInTheDocument();
    expect(progressBarDescription).not.toBeInTheDocument();
    expect(comp).toMatchSnapshot();
  });
});
