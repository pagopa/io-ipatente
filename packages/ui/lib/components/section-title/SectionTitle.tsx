import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";

import { Icon, IconType } from "../icon";

export interface SectionTitleProps {
  icon: IconType;
  label: string;
}

export const SectionTitle = ({ icon, label }: SectionTitleProps) => {
  const theme = useTheme();

  // TODO: Check second color and move to theme
  const BG_LINEAR_GRADIENT = `linear-gradient(180deg, ${alpha(
    theme.palette.primary.main,
    0.2,
  )} 0%, ${alpha("#B3E5E3", 0.45)} 100%)`;

  return (
    <Stack alignItems="center" direction="row" gap={2}>
      <Avatar
        sx={{
          background: BG_LINEAR_GRADIENT,
          color: "text.primary",
          padding: 4,
        }}
        variant="rounded"
      >
        <Icon fontSize="large" name={icon} />
      </Avatar>
      <Typography variant="h5">{label}</Typography>
    </Stack>
  );
};
