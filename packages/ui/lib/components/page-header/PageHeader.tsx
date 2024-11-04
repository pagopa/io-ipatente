import { ArrowForwardIos } from "@mui/icons-material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Stack,
  Typography,
} from "@mui/material";

interface PageHeaderBreadcrumbProps {
  label: string;
  routePath?: string;
}

export interface PageHeaderBreadcrumbsProps {
  breadcrumbs: PageHeaderBreadcrumbProps[];
  onBreadcrumbClick?: (routePath: string) => void;
}

export interface PageHeaderBackButtonProps {
  label: string;
  onBackClick: () => void;
}

export interface PageHeaderBaseProps {
  /** Page Header description: if present, it is shown under the title */
  description?: string;
  /** Page Header main title label */
  title: string;
}

export type PageHeaderProps = (
  | {
      backButtonProps: PageHeaderBackButtonProps;
      breadcrumbsProps?: undefined;
    }
  | {
      backButtonProps?: undefined;
      breadcrumbsProps: PageHeaderBreadcrumbsProps;
    }
  | {
      backButtonProps?: undefined;
      breadcrumbsProps?: undefined;
    }
) &
  PageHeaderBaseProps;

export const DATA_TEST_ID_PREFIX = "io-ipatente-page-header";

const BREADCRUMB_SEPARATOR_COLOR = "#64748B";

/** Page Header component */
export const PageHeader = ({
  backButtonProps,
  breadcrumbsProps,
  description,
  title,
}: PageHeaderProps) => (
  <Stack
    bgcolor="background.pageHeader"
    data-testid={DATA_TEST_ID_PREFIX}
    paddingX={2}
    paddingY={3}
    spacing={1}
  >
    {backButtonProps && (
      <Link
        color="text.primary"
        component="button"
        data-testid={`${DATA_TEST_ID_PREFIX}-back-button`}
        onClick={backButtonProps.onBackClick}
        sx={{
          alignItems: "center",
          columnGap: 0.5,
          display: "flex",
          textDecoration: "underline",
        }}
        variant="sidenav"
      >
        <ArrowBackIcon />
        {backButtonProps.label}
      </Link>
    )}
    {breadcrumbsProps && <PageHeader.Breadcrumbs {...breadcrumbsProps} />}
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
