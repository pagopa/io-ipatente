import { Avatar, Skeleton, Stack, Typography } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import { memo } from "react";

import { Icon, IconType } from "../icon";

export interface SectionTitleBaseProps {
  icon?: IconType;
  label: string;
}

export type SectionTitleProps =
  | {
      isLoading: true;
    }
  | ({
      isLoading?: false;
    } & SectionTitleBaseProps);

export const SectionTitle = memo((props: SectionTitleProps) => {
  const theme = useTheme();

  if (props.isLoading) {
    return <SectionTitleSkeleton />;
  }

  const { icon, label } = props;

  // TODO: Check second color and move to theme
  const BG_LINEAR_GRADIENT = `linear-gradient(180deg, ${alpha(
    theme.palette.primary.main,
    0.2,
  )} 0%, ${alpha("#B3E5E3", 0.45)} 100%)`;

  return (
    <Stack alignItems="center" direction="row" gap={1}>
      {icon && (
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
      )}
      <Typography variant="h5">{label}</Typography>
    </Stack>
  );
});

const SectionTitleSkeleton = () => (
  <Stack alignItems="center" direction="row" gap={1}>
    <Skeleton height={56} variant="circular" width={56} />
    <Skeleton height={32} width="20%" />
  </Stack>
);
