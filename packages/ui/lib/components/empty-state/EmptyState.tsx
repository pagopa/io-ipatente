import { Stack, Typography } from "@mui/material";

import { Icon, IconType } from "../icon";
export interface EmptyStateProps {
  icon: IconType;
  title: string;
}

export const EmptyState = ({ icon, title }: EmptyStateProps) => (
  <Stack
    alignItems="center"
    justifyContent="center"
    rowGap={1}
    textAlign="center"
  >
    <Icon color="inherit" name={icon} />
    <Typography color="text.secondary" variant="body2">
      {title}
    </Typography>
  </Stack>
);
