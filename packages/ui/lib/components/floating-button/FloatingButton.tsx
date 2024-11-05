import { Fab, FabProps, Typography } from "@mui/material";

import { Icon, IconType } from "../icon";

export interface FloatingButtonProps
  extends Pick<FabProps, "color" | "disabled" | "size"> {
  icon: IconType;
  label?: string;
  onClick: () => void;
}

export const FloatingButton = ({
  color,
  disabled = false,
  icon,
  label,
  onClick,
  size = "small",
}: FloatingButtonProps) => (
  <Fab
    color={color}
    disabled={disabled}
    onClick={onClick}
    size={size}
    variant={label ? "extended" : "circular"}
  >
    <Icon name={icon} />
    {label && (
      <Typography
        color={"currentColor"}
        sx={{ marginLeft: 0.5 }}
        variant="caption-semibold"
      >
        {label}
      </Typography>
    )}
  </Fab>
);
