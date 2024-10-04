import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  DATA_TEST_ID_PREFIX,
  PageHeader,
  PageHeaderBreadcrumb,
} from "../PageHeader";

const description = "sample-description";
const title = "sample-title";
const breadcrumbs: PageHeaderBreadcrumb[] = [
  { label: "root-page", routePath: "/root" },
  { label: "leaf-page" },
];

describe("Test PageHeader Component", () => {
  it("Should match the snapshot with all props", () => {
    const comp = render(
      <PageHeader
        breadcrumbs={breadcrumbs}
        description={description}
        title={title}
      />,
    );
    expect(comp).toMatchSnapshot();
  });

  it("Should render a main page header", () => {
    render(<PageHeader description={description} title={title} />);

    const pageHeaderElement = screen.queryByTestId(DATA_TEST_ID_PREFIX);
    const pageHeaderTitle = screen.queryByTestId(
      `${DATA_TEST_ID_PREFIX}-title`,
    );
    const pageHeaderDescription = screen.queryByTestId(
      `${DATA_TEST_ID_PREFIX}-description`,
    );
    const pageHeaderBreadcrumbs = screen.queryByTestId(
      `${DATA_TEST_ID_PREFIX}-breadcrumbs`,
    );

    expect(pageHeaderElement).toBeInTheDocument();
    expect(pageHeaderTitle).toBeInTheDocument();
    expect(pageHeaderDescription).toBeInTheDocument();
    expect(pageHeaderBreadcrumbs).not.toBeInTheDocument();

    expect(pageHeaderTitle).toHaveTextContent(title);
    expect(pageHeaderDescription).toHaveTextContent(description);
  });

  it("Should render a details page header", () => {
    const handleBreadcrumbClick = vi.fn();

    render(
      <PageHeader
        breadcrumbs={breadcrumbs}
        onBreadcrumbClick={handleBreadcrumbClick}
        title={title}
      />,
    );

    const pageHeaderElement = screen.queryByTestId(DATA_TEST_ID_PREFIX);
    const pageHeaderTitle = screen.queryByTestId(
      `${DATA_TEST_ID_PREFIX}-title`,
    );
    const pageHeaderDescription = screen.queryByTestId(
      `${DATA_TEST_ID_PREFIX}-description`,
    );
    const pageHeaderBreadcrumbs = screen.queryByTestId(
      `${DATA_TEST_ID_PREFIX}-breadcrumbs`,
    );
    const pageHeaderRootBreadcrumb = screen.queryByTestId(
      `${DATA_TEST_ID_PREFIX}-breadcrumb-root-0`,
    );

    expect(pageHeaderElement).toBeInTheDocument();
    expect(pageHeaderTitle).toBeInTheDocument();
    expect(pageHeaderDescription).not.toBeInTheDocument();
    expect(pageHeaderBreadcrumbs).toBeInTheDocument();
    expect(pageHeaderTitle).toHaveTextContent(title);
    expect(pageHeaderRootBreadcrumb).toBeInTheDocument();

    if (pageHeaderRootBreadcrumb) {
      fireEvent.click(pageHeaderRootBreadcrumb);
      expect(handleBreadcrumbClick).toHaveBeenCalledTimes(1);
      expect(handleBreadcrumbClick).toHaveBeenCalledWith(
        breadcrumbs[0].routePath,
      );
      expect(pageHeaderRootBreadcrumb).toHaveTextContent(breadcrumbs[0].label);
    }
  });

  it("Should not trigger onBreadcrumbClick for a root breadcrumb without routePath", () => {
    const handleBreadcrumbClick = vi.fn();
    const breadcrumbs: PageHeaderBreadcrumb[] = [
      { label: "root-page" },
      { label: "leaf-page" },
    ];

    render(
      <PageHeader
        breadcrumbs={breadcrumbs}
        onBreadcrumbClick={handleBreadcrumbClick}
        title={title}
      />,
    );

    const pageHeaderRootBreadcrumb = screen.queryByTestId(
      `${DATA_TEST_ID_PREFIX}-breadcrumb-root-0`,
    );

    expect(pageHeaderRootBreadcrumb).toBeInTheDocument();

    if (pageHeaderRootBreadcrumb) {
      fireEvent.click(pageHeaderRootBreadcrumb);
      expect(handleBreadcrumbClick).not.toHaveBeenCalled();
      expect(pageHeaderRootBreadcrumb).toHaveTextContent(breadcrumbs[0].label);
    }
  });
});
