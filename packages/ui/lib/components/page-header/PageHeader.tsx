import { ArrowForwardIos } from "@mui/icons-material";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
  /** Breadcrumb item displayed text */
  label: string;
  /** Breadcrumb item route path */
  routePath?: string;
}

export const DATA_TEST_ID_PREFIX = "io-ipatente-page-header";

const PAGE_HEADER_BG_COLOR = "#DFF1F3";
const BREADCRUMB_SEPARATOR_COLOR = "#64748B";

/** Page Header component */
export const PageHeader = ({
  breadcrumbs,
  description,
  onBreadcrumbClick,
  title,
}: PageHeaderProps) => (
  <Stack
    bgcolor={PAGE_HEADER_BG_COLOR}
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
      index < items.length - 1 ? (
        <Link
          component="button"
          data-testid={`${DATA_TEST_ID_PREFIX}-breadcrumb-root-${index}`}
          key={`${DATA_TEST_ID_PREFIX}-breadcrumb-${index}`}
          onClick={() =>
            item.routePath && onBreadcrumbClick !== undefined
              ? onBreadcrumbClick(item.routePath)
              : null
          }
          sx={{ textDecoration: "underline" }}
          variant="sidenav"
        >
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
