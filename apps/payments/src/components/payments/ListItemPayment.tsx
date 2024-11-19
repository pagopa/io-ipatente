import {
  Pagamento,
  StatoRichiestaPagamentoEnum,
} from "@/generated/bff-openapi";
import { BadgeProps, ListItemAction } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";
import { useCallback, useMemo } from "react";

export interface ListItemPaymentProps {
  data: Pagamento;
  onClick: (requestId: string) => void;
}

export const ListItemPayment = ({ data, onClick }: ListItemPaymentProps) => {
  const { t } = useTranslation();

  const { causale, idCarrello, idRichiesta, statoPratica } = data;

  const getBadgeByPaymentStatus = useCallback(
    (status: StatoRichiestaPagamentoEnum): BadgeProps => {
      const label = t(`paymentDetails.info.statoPratica.${status}`);
      switch (status) {
        case "A":
          return {
            color: "default",
            icon: "forbidden",
            label: label,
            size: "small",
          };
        case "B":
          return {
            color: "default",
            icon: "forbidden",
            label: label,
            size: "small",
          };
        case "C":
          return {
            color: "info",
            icon: "refresh2",
            label: label,
            size: "small",
          };
        case "D":
          return {
            color: "warning",
            icon: "warningBold",
            label: label,
            size: "small",
          };
        case "E":
          return {
            color: "error",
            icon: "warning2Bold",
            label: label,
            size: "small",
          };
        case "G":
          return {
            color: "warning",
            icon: "warningBold",
            label: label,
            size: "small",
          };
        case "I":
          return {
            color: "info",
            icon: "refresh2",
            label: label,
            size: "medium",
          };
        case "L":
          return {
            color: "default",
            icon: "forbidden",
            label: label,
            size: "small",
          };
        case "M":
          return {
            color: "success",
            icon: "tickCircleBold",
            label: label,
            size: "small",
          };
        case "N":
          return {
            color: "warning",
            icon: "warningBold",
            label: label,
            size: "small",
          };
        case "P":
          return {
            color: "success",
            icon: "tickCircleBold",
            label: label,
            size: "small",
          };
        case "R":
          return {
            color: "success",
            icon: "tickCircleBold",
            label: label,
            size: "small",
          };
        case "X":
          return {
            color: "error",
            icon: "warning2Bold",
            label: label,
            size: "small",
          };
        case "Z":
          return {
            color: "default",
            icon: "forbidden",
            label: label,
            size: "small",
          };
      }
    },
    [t],
  );

  const badges = useMemo<BadgeProps[]>(
    () =>
      !statoPratica.codice
        ? []
        : [getBadgeByPaymentStatus(statoPratica.codice)],
    [getBadgeByPaymentStatus, statoPratica.codice],
  );

  return (
    <ListItemAction
      badges={badges}
      label={`${t("paymentDetails.info.title")} ${idCarrello}`}
      onClick={() => onClick(`${idRichiesta}`)}
      value={`${causale}`}
    />
  );
};
