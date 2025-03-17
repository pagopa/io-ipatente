import { Fab, FabProps, Typography } from "@mui/material";

import { Icon, IconType } from "../icon";

export type FloatingButtonProps = { icon: IconType; label?: string } & Pick<
  FabProps,
  "color" | "disabled" | "onClick" | "size"
>;

export const FloatingButton = ({
  icon,
  label,
  size = "small",
  ...rest
}: FloatingButtonProps) => (
  <Fab
    data-testid={"floating-button-component"}
    size={size}
    variant={label ? "extended" : "circular"}
    {...rest}
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
