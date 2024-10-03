import { createTheme } from "@mui/material/styles";
import { theme as muiItaliaTheme } from "@pagopa/mui-italia";

const colorTextPrimary = "#003366";

const UITheme = createTheme({
  ...muiItaliaTheme,
  palette: {
    ...muiItaliaTheme.palette,
    error: {
      ...muiItaliaTheme.palette.error,
      contrastText: colorTextPrimary,
    },
    info: {
      ...muiItaliaTheme.palette.info,
      contrastText: colorTextPrimary,
    },
    primary: {
      // Test purpose
      main: "#5E0A80",
    },
    success: {
      ...muiItaliaTheme.palette.success,
      contrastText: colorTextPrimary,
    },
    text: {
      ...muiItaliaTheme.palette.text,
      primary: colorTextPrimary,
    },
    warning: {
      ...muiItaliaTheme.palette.warning,
      contrastText: colorTextPrimary,
    },
  },
  typography: {
    ...muiItaliaTheme.typography,
    allVariants: {
      color: colorTextPrimary,
    },
  },
});

export default UITheme;
