import { Fab, FabProps } from "@mui/material";

import { Icon, IconType } from "../icon";

export interface FloatingButtonProps
  extends Pick<FabProps, "color" | "disabled" | "size" | "variant"> {
  icon: IconType;
  onClick: () => void;
}

export const FloatingButton = ({
  color,
  disabled = false,
  icon,
  onClick,
  size = "small",
  variant = "circular",
}: FloatingButtonProps) => (
  <Fab
    color={color}
    disabled={disabled}
    onClick={onClick}
    size={size}
    variant={variant}
  >
    <Icon name={icon} />
  </Fab>
);
