import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { AppBar, IconButton, Link, Stack, Toolbar } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";

import { Logo, LogoType } from "../logo";

interface AssistanceProps {
  label: string;
  onClick: () => void;
}

interface ProductProps {
  logo: LogoType;
  name: string;
  url: string;
}

export interface TopBarProps {
  assistance?: AssistanceProps;
  product: ProductProps;
}

export const TopBar = ({ assistance, product }: TopBarProps) => (
  <AppBar position="static" sx={{ bgcolor: "background.paper" }}>
    <Toolbar>
      <Logo name={product.logo} />
      <Stack
        alignItems="center"
        direction="row"
        spacing={2}
        sx={{ flexGrow: 1, ml: 1 }}
      >
        <Link
          color="primary"
          href={product.url}
          underline="none"
          variant="caption"
          width={100}
        >
          {product.name}
        </Link>
      </Stack>

      {assistance && (
        <Stack alignItems="center" direction="row" spacing={2}>
          <ButtonNaked
            component="button"
            onClick={assistance.onClick}
            size="small"
            startIcon={<HelpOutlineRoundedIcon />}
            sx={{ display: ["none", "flex"] }}
            weight="default"
          >
            {assistance.label}
          </ButtonNaked>
          <IconButton
            aria-label={assistance.label}
            onClick={assistance.onClick}
            size="small"
            sx={{ display: ["flex", "none"] }}
          >
            <HelpOutlineRoundedIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      )}
    </Toolbar>
  </AppBar>
);
