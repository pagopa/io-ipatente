import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import {
  Chip,
  ChipProps,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

import { Icon, IconType } from "../icon";

type BadgeProps = {
  icon: IconType;
} & Pick<ChipProps, "color" | "label" | "size">;

export interface ListItemActionProps {
  badges?: BadgeProps[];
  icon: IconType;
  label: string;
  onClick: () => void;
  value: string;
}

export const ListItemAction = ({
  badges = [],
  icon,
  label,
  onClick,
  value,
}: ListItemActionProps) => (
  <ListItem
    disablePadding
    sx={{ bgcolor: "background.paper", boxShadow: (theme) => theme.shadows[4] }}
  >
    <ListItemButton onClick={onClick}>
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
  </ListItem>
);
