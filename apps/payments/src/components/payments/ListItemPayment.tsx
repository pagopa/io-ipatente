import { Pagamento } from "@/generated/bff-openapi";
import { ListItemAction } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";

export interface ListItemPaymentProps {
  data: Pagamento;
  onClick: (requestId: string) => void;
}

export const ListItemPayment = ({ data, onClick }: ListItemPaymentProps) => {
  const { t } = useTranslation();

  const { idRichiesta } = data;

  // const { icon, label } = TODO

  return (
    <ListItemAction
      badges={[]}
      icon="error"
      label={t("paymentDetails.info.title")}
      onClick={() => onClick(`${idRichiesta}`)}
      value={`${idRichiesta}`}
    />
  );
};
