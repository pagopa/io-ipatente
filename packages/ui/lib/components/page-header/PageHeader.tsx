import { ArrowForwardIos } from "@mui/icons-material";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Stack,
  Typography,
} from "@mui/material";

import { Icon, IconType } from "../icon";

export interface PageHeaderProps {
  /** A list of links that help visualize page's location within app hierarchical structure.
   * It allows navigation up to any of the ancestors.
   * */
  breadcrumbs?: PageHeaderBreadcrumb[];
  /** Page Header description: if present, it is shown under the title */
  description?: string;
  /** Event triggered when user click on a breadcrumb with `routePath` defined */
  onBreadcrumbClick?: (routePath: string) => void;
  /** Page Header main title label */
  title: string;
}

export interface PageHeaderBreadcrumbsProps {
  breadcrumbs: PageHeaderBreadcrumb[];
  onBreadcrumbClick?: (routePath: string) => void;
}

export interface PageHeaderBreadcrumb {
  /** Breadcrumb item clickable */
  clickable?: boolean;
  /** Breadcrumb item icon */
  icon?: IconType;
  /** Breadcrumb item displayed text */
  label: string;
  /** Breadcrumb item route path */
  routePath?: string;
}

export const DATA_TEST_ID_PREFIX = "io-ipatente-page-header";

const BREADCRUMB_SEPARATOR_COLOR = "#64748B";

/** Page Header component */
export const PageHeader = ({
  breadcrumbs,
  description,
  onBreadcrumbClick,
  title,
}: PageHeaderProps) => (
  <Stack
    bgcolor="background.pageHeader"
    data-testid={DATA_TEST_ID_PREFIX}
    paddingX={2}
    paddingY={3}
    spacing={1}
  >
    {breadcrumbs && (
      <PageHeader.Breadcrumbs
        breadcrumbs={breadcrumbs}
        onBreadcrumbClick={onBreadcrumbClick}
      />
    )}
    <Typography data-testid={`${DATA_TEST_ID_PREFIX}-title`} variant="h3">
      {title}
    </Typography>
    {description && (
      <Typography
        data-testid={`${DATA_TEST_ID_PREFIX}-description`}
        variant="body2"
      >
        {description}
      </Typography>
    )}
  </Stack>
);

/** Page Header Breadcrumbs internal component */
const Breadcrumbs = ({
  breadcrumbs,
  onBreadcrumbClick,
}: PageHeaderBreadcrumbsProps) => (
  <MuiBreadcrumbs
    data-testid={`${DATA_TEST_ID_PREFIX}-breadcrumbs`}
    separator={
      <ArrowForwardIos
        fontSize="inherit"
        sx={{ color: BREADCRUMB_SEPARATOR_COLOR }}
      />
    }
  >
    {breadcrumbs.map((item, index, items) =>
      index < items.length - 1 || item.clickable ? (
        <Link
          color="text.primary"
          component="button"
          data-testid={`${DATA_TEST_ID_PREFIX}-breadcrumb-root-${index}`}
          key={`${DATA_TEST_ID_PREFIX}-breadcrumb-${index}`}
          onClick={() =>
            item.routePath && onBreadcrumbClick !== undefined
              ? onBreadcrumbClick(item.routePath)
              : null
          }
          sx={{
            alignItems: "center",
            columnGap: 0.5,
            display: "flex",
            textDecoration: "underline",
          }}
          variant="sidenav"
        >
          {item.icon && <Icon name={item.icon} style={{ marginRight: 0 }} />}
          {item.label}
        </Link>
      ) : (
        <Typography
          data-testid={`${DATA_TEST_ID_PREFIX}-breadcrumb-leaf`}
          key={`${DATA_TEST_ID_PREFIX}-breadcrumb-${index}`}
          variant="body2"
        >
          {item.label}
        </Typography>
      ),
    )}
  </MuiBreadcrumbs>
);

// namespaced component
PageHeader.Breadcrumbs = Breadcrumbs;
