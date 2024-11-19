import { Pagamento } from "@/generated/bff-openapi";
import { CardInfo, CardInfoItem, Icon } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";

interface MetadataListItem {
  items: ({ isVisible: boolean } & CardInfoItem)[];
}

export interface PaymentSectionDetailsProps {
  data: Pagamento;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const PaymentSectionDetails = ({ data }: PaymentSectionDetailsProps) => {
  const { t } = useTranslation();

  // const { idRichiesta } = data;

  // const { icon, label } = TODO

  const metadataListItems: MetadataListItem = {
    items: [],
  };

  const filteredMetadataListItems = metadataListItems.items.filter(
    (item) => item.isVisible !== false,
  );

  return (
    <CardInfo
      icon={<Icon fontSize="medium" name="error" />}
      items={filteredMetadataListItems}
      title={t("paymentDetails.info.title")}
    />
  );
};
