import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";

import {
  DATA_TEST_ID_PREFIX,
  UIPageHeader,
  UIPageHeaderBreadcrumb,
} from "../Pageheader";

const description = "sample-description";
const title = "sample-title";
const breadcrumbs: UIPageHeaderBreadcrumb[] = [
  { label: "root-page", routePath: "/root" },
  { label: "leaf-page" },
];

it("[UIPageHeader] Should render a main page header", () => {
  render(<UIPageHeader description={description} title={title} />);

  const pageHeaderElement = screen.queryByTestId(DATA_TEST_ID_PREFIX);
  const pageHeaderTitle = screen.queryByTestId(`${DATA_TEST_ID_PREFIX}-title`);
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

it("[UIPageHeader] Should render a details page header", () => {
  const handleBreadcrumbClick = vi.fn();

  render(
    <UIPageHeader
      breadcrumbs={breadcrumbs}
      onBreadcrumbClick={handleBreadcrumbClick}
      title={title}
    />,
  );

  const pageHeaderElement = screen.queryByTestId(DATA_TEST_ID_PREFIX);
  const pageHeaderTitle = screen.queryByTestId(`${DATA_TEST_ID_PREFIX}-title`);
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

it("[UIPageHeader] Should not trigger onBreadcrumbClick for a root breadcrumb without routePath", () => {
  const handleBreadcrumbClick = vi.fn();
  const breadcrumbs: UIPageHeaderBreadcrumb[] = [
    { label: "root-page" },
    { label: "leaf-page" },
  ];

  render(
    <UIPageHeader
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
