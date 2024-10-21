import { Avatar, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { memo } from "react";

import { Icon, IconType } from "../icon";

export interface SectionTitleProps {
  icon: IconType;
  label: string;
}

export const SectionTitle = memo(({ icon, label }: SectionTitleProps) => {
  const theme = useTheme();

  // TODO: Check second color and move to theme
  const BG_LINEAR_GRADIENT = `linear-gradient(180deg, ${alpha(
    theme.palette.primary.main,
    0.2,
  )} 0%, ${alpha("#B3E5E3", 0.45)} 100%)`;

  return (
    <Stack alignItems="center" direction="row" gap={1}>
      <Avatar
        sx={{
          background: BG_LINEAR_GRADIENT,
          color: "text.primary",
          padding: 3.5,
        }}
        variant="rounded"
      >
        <Icon fontSize="medium-small" name={icon} />
      </Avatar>
      <Typography variant="h5">{label}</Typography>
    </Stack>
  );
});
