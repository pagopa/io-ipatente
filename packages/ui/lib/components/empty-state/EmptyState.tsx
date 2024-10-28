import { Stack, Typography } from "@mui/material";

import { theme } from "../../theme";
import { Icon, IconType } from "../icon";
export interface EmptyStateProps {
  icon: IconType;
  title: string;
}

export const EmptyState = ({ icon, title }: EmptyStateProps) => (
  <Stack
    alignItems="center"
    borderRadius="8px"
    justifyContent="center"
    padding="16px"
    textAlign="center"
  >
    <Stack alignItems="center" justifyContent="center" rowGap="8px">
      <Icon color="inherit" name={icon} />
      <Typography color={theme.palette.text.secondary}>{title}</Typography>
    </Stack>
  </Stack>
);
