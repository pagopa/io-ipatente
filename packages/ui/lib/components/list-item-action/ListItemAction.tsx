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

export type BadgeProps = {
  icon: IconType;
} & Pick<ChipProps, "color" | "label" | "size">;

interface ListItemActionBaseProps {
  badges?: BadgeProps[];
  icon: IconType;
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
      <ListItemIcon>
        <Icon fontSize="medium" name={icon} />
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={<Typography variant="caption">{label}</Typography>}
        secondary={
          <>
            <Typography mb={1} variant="h6">
              {value}
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }} useFlexGap>
              {badges.map(({ icon, ...rest }, index) => (
                <Chip
                  {...rest}
                  icon={<Icon fontSize="small" name={icon} />}
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
      <Skeleton height={40} variant="circular" width={40} />
    </ListItemIcon>
    <ListItemText
      disableTypography
      primary={<Skeleton width="60%" />}
      secondary={
        <>
          <Skeleton width="40%" />
          <Skeleton width="20%" />
        </>
      }
    />
  </ListItem>
);
