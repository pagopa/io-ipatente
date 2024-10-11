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

export interface ListItemActionProps {
  chips?: ChipProps[];
  icon: IconType;
  label: string;
  onClick: () => void;
  value: string;
}

export const ListeItemAction = ({
  chips = [],
  icon,
  label,
  onClick,
  value,
}: ListItemActionProps) => (
  <ListItem disablePadding sx={{ boxShadow: (theme) => theme.shadows[4] }}>
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
            {chips.length > 0 && (
              <Stack
                direction="row"
                sx={{ flexWrap: "wrap", gap: 1 }}
                useFlexGap
              >
                {chips.map((props, index) => (
                  <Chip {...props} key={`item-${index}`} />
                ))}
              </Stack>
            )}
          </>
        }
      />
      <ArrowForwardIos />
    </ListItemButton>
  </ListItem>
);
