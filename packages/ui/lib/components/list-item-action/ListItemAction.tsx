import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import Chip, { ChipProps } from "@mui/material/Chip";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

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
