import { Pratica } from "@/generated/bff-openapi";
import { BadgeProps } from "@io-ipatente/ui";

export const BADGES_CONFIG_BY_PRACTICE_CODE: Record<
  Pratica["statoPratica"],
  Omit<BadgeProps, "label">
> = {
  cancel: {
    color: "default",
    icon: "forbidden",
    size: "small",
  },
  success: {
    color: "success",
    icon: "tickCircleBold",
    size: "small",
  },
  todo: {
    color: "info",
    icon: "refresh2",
    size: "small",
  },
};
