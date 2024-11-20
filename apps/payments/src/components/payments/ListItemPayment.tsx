import { Pagamento } from "@/generated/bff-openapi";
import { BadgeProps, ListItemAction } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

import { BADGES_CONFIG_BY_CODE } from "./consts";

export interface ListItemPaymentProps {
  data: Pagamento;
  onClick: (requestId: string) => void;
}

export const ListItemPayment = ({ data, onClick }: ListItemPaymentProps) => {
  const { t } = useTranslation();

  const { causale, idCarrello, idRichiesta, statoPratica } = data;

  const badges = useMemo<BadgeProps[]>(
    () =>
      !statoPratica.codice
        ? []
        : [
            {
              ...BADGES_CONFIG_BY_CODE[statoPratica.codice],
              label: t(
                `paymentDetails.info.statoPratica.${statoPratica.codice}`,
              ),
            },
          ],
    [statoPratica.codice, t],
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
