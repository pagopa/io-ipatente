import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { theme as muiItaliaTheme } from "@pagopa/mui-italia";

const colorTextPrimary = "#003366";

const UITheme = createTheme(
  deepmerge(muiItaliaTheme, {
    palette: {
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
      },
      warning: {
        contrastText: colorTextPrimary,
      },
    },
    typography: {
      allVariants: {
        color: colorTextPrimary,
      },
    },
  }),
);

export default UITheme;
