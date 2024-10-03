import { createTheme } from "@mui/material/styles";
import { deepmerge } from "@mui/utils";
import { theme as muiItaliaTheme } from "@pagopa/mui-italia";

const UITheme = createTheme(
  deepmerge(muiItaliaTheme, {
    palette: {
      primary: {
        main: "#0066CC",
      },
    },
  }),
);

export default UITheme;
