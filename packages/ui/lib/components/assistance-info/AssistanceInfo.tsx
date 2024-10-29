import { Stack, Typography } from "@mui/material";

export interface AssistanceInfoProps {
  description: string;
  phone: string;
  title: string;
}

export const AssistanceInfo = ({
  description,
  phone,
  title,
}: AssistanceInfoProps) => (
  <Stack
    alignItems="center"
    justifyContent="center"
    rowGap={2}
    textAlign="center"
  >
    <Stack
      alignItems="center"
      border={1}
      borderColor="divider"
      borderRadius={1}
      justifyContent="center"
      padding={2}
      rowGap={1.25}
      textAlign="center"
    >
      <Typography color="text.primary" variant="body1">
        {title}
      </Typography>
      <Typography color="text.primary" variant="h3">
        {phone}
      </Typography>
    </Stack>
    <Stack alignItems="center" justifyContent="center">
      <Typography color="text.primary" variant="body2">
        {description}
      </Typography>
    </Stack>
  </Stack>
);
