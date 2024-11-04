import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { theme as muiItaliaTheme, pxToRem } from "@pagopa/mui-italia";

export const colorTextPrimary = "#003366";
export const colorPrimaryContainedHover = "#004D99";

// Added colors from figma
export const colorBackgroundPageHeader = "#DFF1F3";
const colorSecondaryContainedHover = "#0F766E";
const colorErrorContainedHover = "#901323";
const colorSuccessContainedHover = "#165A36";
const colorWarningContainedHover = "#663D00";

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsSizeOverrides {
    "medium-small": true;
  }
}

export const theme = createTheme(
  deepmerge(muiItaliaTheme, {
    components: {
      MuiBreadcrumbs: {
        styleOverrides: {
          li: {
            p: {
              fontSize: pxToRem(18),
            },
          },
          root: {
            fontSize: pxToRem(18),
          },
          separator: {
            color: "#64748B",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "#F5F7FB",
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          avatar: {
            marginRight: pxToRem(8),
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          label: {
            fontSize: pxToRem(16),
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            paddingBottom: muiItaliaTheme.spacing(1.5),
            paddingTop: muiItaliaTheme.spacing(1.5),
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            paddingBottom: muiItaliaTheme.spacing(1.5),
            paddingTop: muiItaliaTheme.spacing(1.5),
          },
        },
      },
      MuiSvgIcon: {
        variants: [
          {
            props: { fontSize: "medium-small" },
            style: {
              fontSize: pxToRem(32),
            },
          },
        ],
      },
    },
    palette: {
      action: {
        active: colorTextPrimary,
        focus: "rgba(0, 115, 230, 0.4)",
        hover: "rgba(23, 50, 77, 0.04)",
        hoverOpacity: 0.04,
        selected: "rgba(0, 115, 230, 0.08)",
      },
      background: {
        default: "#FFFFFF",
        pageHeader: colorBackgroundPageHeader,
      },
      divider: "#CBD5E1",
      error: {
        containedHoverBackground: colorErrorContainedHover,
        contrastText: colorTextPrimary,
        dark: "#5F0C17",
        light: "#FCE8EB",
        main: "#BD192E",
      },
      info: {
        contrastText: colorTextPrimary,
      },
      primary: {
        containedHoverBackground: colorPrimaryContainedHover,
        light: "#DCEDFF",
        main: "#0066CC",
      },
      secondary: {
        containedHoverBackground: colorSecondaryContainedHover,
        light: "#CCFBF1",
        main: "#2DD4BF",
      },
      success: {
        containedHoverBackground: colorSuccessContainedHover,
        contrastText: colorTextPrimary,
        dark: "#0F3E25",
        light: "#E6F9EF",
        main: "#1D7748",
      },
      text: {
        disabled: "#94A3B8",
        primary: colorTextPrimary,
        secondary: "#334155",
      },
      warning: {
        containedHoverBackground: colorWarningContainedHover,
        contrastText: colorTextPrimary,
        dark: "#422700",
        light: "#F6E4C8",
        main: "#995C00",
      },
    },
    typography: {
      allVariants: {
        color: colorTextPrimary,
      },
      body1: {
        color: colorTextPrimary,
        lineHeight: 1.35 /* ~24px */,
      },
      body2: {
        color: colorTextPrimary,
      },
      button: {
        color: colorTextPrimary,
      },
      caption: {
        color: colorTextPrimary,
        fontSize: pxToRem(12),
      },
      "caption-semibold": {
        color: colorTextPrimary,
        fontSize: pxToRem(12),
      },
      h1: {
        color: colorTextPrimary,
        fontSize: pxToRem(40),
      },
      h2: {
        color: colorTextPrimary,
      },
      h3: {
        color: colorTextPrimary,
      },
      h4: {
        color: colorTextPrimary,
      },
      h5: {
        color: colorTextPrimary,
      },
      h6: {
        color: colorTextPrimary,
        fontSize: pxToRem(20),
      },
      headline: {
        color: colorTextPrimary,
      },
      monospaced: {
        color: colorTextPrimary,
      },
      overline: {
        color: colorTextPrimary,
      },
      sidenav: {
        color: colorTextPrimary,
      },
    },
  }),
);

export type IOIPatenteTheme = typeof theme;
