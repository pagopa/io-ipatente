import { createTheme } from "@mui/material/styles";
import { theme as muiItaliaTheme } from "@pagopa/mui-italia";

const UITheme = createTheme({
  ...muiItaliaTheme,
  palette: {
    ...muiItaliaTheme.palette,
    primary: {
      // Test purpose
      main: "#5E0A80",
    },
  },
});

export default UITheme;
