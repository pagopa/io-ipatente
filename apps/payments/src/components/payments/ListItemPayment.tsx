import { Pagamento } from "@/generated/bff-openapi";
import { BADGES_CONFIG_BY_CODE } from "@/utils/consts";
import { BadgeProps, ListItemAction } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

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
      label={`${t("paymentDetails.cartID")} ${idCarrello}`}
      onClick={() => onClick(`${idRichiesta}`)}
      value={`${causale}`}
    />
  );
};
