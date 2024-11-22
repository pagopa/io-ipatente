import {
  StatoIuvEnum,
  StatoRichiestaPagamentoEnum,
} from "@/generated/bff-openapi";
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

export const BADGES_CONFIG_BY_CODE: Record<
  StatoRichiestaPagamentoEnum,
  Omit<BadgeProps, "label">
> = {
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
  G: {
    color: "warning",
    icon: "warningBold",
    size: "small",
  },
  I: {
    color: "info",
    icon: "refresh2",
    size: "small",
  },
  L: {
    color: "default",
    icon: "forbidden",
    size: "small",
  },
  M: {
    color: "success",
    icon: "tickCircleBold",
    size: "small",
  },
  N: {
    color: "warning",
    icon: "warningBold",
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
  X: {
    color: "error",
    icon: "warning2Bold",
    size: "small",
  },
  Z: {
    color: "default",
    icon: "forbidden",
    size: "small",
  },
};
