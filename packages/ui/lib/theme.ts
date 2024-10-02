import { createTheme } from "@mui/material/styles";
import { theme as muiItaliaTheme } from "@pagopa/mui-italia";

const UITheme = createTheme({
  ...muiItaliaTheme,
  palette: {
    ...muiItaliaTheme.palette,
    primary: {
      // Test purpose
      main: "purple",
    },
  },
});

export default UITheme;
