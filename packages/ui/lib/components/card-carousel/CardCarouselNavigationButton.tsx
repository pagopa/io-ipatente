import IconButton, { IconButtonProps } from "@mui/material/IconButton";

import { Icon, IconType } from "../icon";

type CardCarouselNavigationButtonProps = { icon: IconType } & Pick<
  IconButtonProps,
  "aria-label" | "className"
>;

export const CardCarouselNavigationButton = ({
  icon,
  ...rest
}: CardCarouselNavigationButtonProps) => (
  <IconButton
    {...rest}
    sx={{ color: (theme) => theme.palette.text.primary, p: 0.5 }}
  >
    <Icon fontSize="medium" name={icon} />
  </IconButton>
);
