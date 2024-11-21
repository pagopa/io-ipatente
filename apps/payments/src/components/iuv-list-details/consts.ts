import { StatoIuvEnum } from "@/generated/bff-openapi";
import { BadgeProps } from "@io-ipatente/ui";

export const BADGES_BY_IUV_STATUS: Record<StatoIuvEnum, BadgeProps> = {
  A: {
    color: "default",
    icon: "forbidden",
    size: "small",
  },
  B: {
    color: "default",
    icon: "forbidden",
    size: "small",
  },
  C: {
    color: "info",
    icon: "refresh2",
    size: "small",
  },
  D: {
    color: "warning",
    icon: "warningBold",
    size: "small",
  },
  E: {
    color: "error",
    icon: "warning2Bold",
    size: "small",
  },
  M: {
    color: "warning",
    icon: "warningBold",
    size: "small",
  },
  N: {
    color: "info",
    icon: "refresh2",
    size: "small",
  },
  P: {
    color: "success",
    icon: "tickCircleBold",
    size: "small",
  },
  R: {
    color: "success",
    icon: "tickCircleBold",
    size: "small",
  },
  S: {
    color: "error",
    icon: "warning2Bold",
    size: "small",
  },
  T: {
    color: "success",
    icon: "tickCircleBold",
    size: "small",
  },
};
