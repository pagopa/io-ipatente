import { Stack, Typography } from "@mui/material";

import { Icon, IconType } from "../icon";

export interface EmptyStateProps {
  name: IconType;
  title: string;
}

export const EmptyState = ({ name, title }: EmptyStateProps) => (
  <Stack
    alignItems="center"
    bgcolor="#F5F5F5"
    border={1}
    borderColor="#E3E7EB"
    borderRadius="8px"
    justifyContent="center"
    padding="16px"
    textAlign="center"
  >
    <Stack alignItems="center" justifyContent="center" rowGap="8px">
      <Icon color="disabled" fill="#5C6F82" name={name} />
      <Typography color="#5C6F82">{title}</Typography>
    </Stack>
  </Stack>
);
