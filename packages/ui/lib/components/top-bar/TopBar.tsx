import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import { Container, IconButton, Link, Stack } from "@mui/material";
import { ButtonNaked } from "@pagopa/mui-italia";

import { Logo, LogoType } from "../logo";

interface ContextualHelpProps {
  onAssistanceClick: () => void;
  title: string;
}

interface ProductProps {
  logo: LogoType;
  name: string;
  url: string;
}

export type TopBarProps = {
  product: ProductProps;
} & (
  | {
      contextualHelp: ContextualHelpProps;
      enableAssistance: true;
    }
  | {
      contextualHelp?: never;
      enableAssistance?: false;
    }
);

export const TopBar = ({
  contextualHelp,
  enableAssistance,
  product,
}: TopBarProps) => (
  <Stack
    component="div"
    justifyContent="center"
    sx={{
      backgroundColor: "background.paper",
      borderBottom: 1,
      borderColor: "divider",
      minHeight: "62px",
    }}
  >
    <Container maxWidth={false}>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
      >
        <Stack alignItems="center" direction="row" spacing={2}>
          <Logo name={product.logo} />
          <Stack alignItems="center" direction="row">
            <Link
              color="primary.main"
              href={product.url}
              underline="none"
              variant="caption"
              width={100}
            >
              {product.name}
            </Link>
          </Stack>
        </Stack>

        {enableAssistance && (
          <Stack
            alignItems="center"
            direction="row"
            spacing={{ md: 4, sm: 3, xs: 1 }}
          >
            <ButtonNaked
              component="button"
              onClick={contextualHelp.onAssistanceClick}
              size="small"
              startIcon={<HelpOutlineRoundedIcon />}
              sx={{ display: ["none", "flex"] }}
              weight="default"
            >
              {contextualHelp.title}
            </ButtonNaked>
            <IconButton
              aria-label={contextualHelp.title}
              onClick={contextualHelp.onAssistanceClick}
              size="small"
              sx={{ color: "text.primary", display: ["flex", "none"] }}
            >
              <HelpOutlineRoundedIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Container>
  </Stack>
);
