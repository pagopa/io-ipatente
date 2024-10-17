import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { theme as muiItaliaTheme, pxToRem } from "@pagopa/mui-italia";

const colorTextPrimary = "#003366";

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsSizeOverrides {
    "medium-small": true;
  }
}

export const theme = createTheme(
  deepmerge(muiItaliaTheme, {
    components: {
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
      background: {
        default: "#FFFFFF",
      },
      divider: "#CBD5E1",
      error: {
        contrastText: colorTextPrimary,
      },
      info: {
        contrastText: colorTextPrimary,
      },
      primary: {
        main: "#0066CC",
      },
      success: {
        contrastText: colorTextPrimary,
      },
      text: {
        primary: colorTextPrimary,
        secondary: "#64748B",
      },
      warning: {
        contrastText: colorTextPrimary,
      },
    },
    typography: {
      allVariants: {
        color: colorTextPrimary,
      },
      body1: {
        color: colorTextPrimary,
      },
      body2: {
        color: colorTextPrimary,
      },
      button: {
        color: colorTextPrimary,
      },
      caption: {
        color: colorTextPrimary,
      },
      "caption-semibold": {
        color: colorTextPrimary,
      },
      h1: {
        color: colorTextPrimary,
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
