import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import {
  Chip,
  ChipProps,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

import { Icon, IconType } from "../icon";

type BaseBadgeProps = Pick<ChipProps, "color" | "label" | "size">;

export type BadgeProps = {
  icon?: IconType;
} & BaseBadgeProps;

export type FullBadgeProps = Omit<BadgeProps, "icon"> &
  Required<Pick<BadgeProps, "icon">>;

interface ListItemActionBaseProps {
  badges?: BadgeProps[];
  icon?: IconType;
  label: string;
  onClick: () => void;
  value: string;
}

export type ListItemActionProps =
  | {
      isLoading: true;
    }
  | ({
      isLoading?: false;
    } & ListItemActionBaseProps);

export const ListItemAction = (props: ListItemActionProps) => {
  if (props.isLoading) {
    return <ListItemActionSkeleton />;
  }

  const { badges = [], icon, label, onClick, value } = props;

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        bgcolor: "background.paper",
        boxShadow: (theme) => theme.shadows[4],
      }}
    >
      {icon && (
        <ListItemIcon>
          <Icon fontSize="medium" name={icon} />
        </ListItemIcon>
      )}
      <ListItemText
        disableTypography
        primary={
          <Typography component={"p"} variant="caption-semibold">
            {label}
          </Typography>
        }
        secondary={
          <>
            <Typography mb={1} variant="h5">
              {value}
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }} useFlexGap>
              {badges.map(({ icon, ...rest }, index) => (
                <Chip
                  {...rest}
                  icon={icon && <Icon fontSize="small" name={icon} />}
                  key={`chip-${index}`}
                />
              ))}
            </Stack>
          </>
        }
      />
      <ArrowForwardIos />
    </ListItemButton>
  );
};

const ListItemActionSkeleton = () => (
  <ListItem
    sx={{
      bgcolor: "background.paper",
      boxShadow: (theme) => theme.shadows[4],
    }}
  >
    <ListItemIcon>
      <Skeleton height={24} variant="circular" width={24} />
    </ListItemIcon>
    <ListItemText
      disableTypography
      primary={<Skeleton height={12} width="20%" />}
      secondary={
        <>
          <Skeleton width="40%" />
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }} useFlexGap>
            <Skeleton height={24} width="15%" />
            <Skeleton height={24} width="25%" />
          </Stack>
        </>
      }
    />
  </ListItem>
);
