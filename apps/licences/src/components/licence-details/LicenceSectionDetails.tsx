import { DatiPatente } from "@/generated/bff-openapi";
import { CardInfo, CardInfoItem, Icon } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";

interface MetadataListItem {
  items: ({ isVisible: boolean } & CardInfoItem)[];
}

export interface LicenceSectionDetailsProps {
  data: DatiPatente;
}

export const LicenceSectionDetails = ({ data }: LicenceSectionDetailsProps) => {
  const { t } = useTranslation();

  const { numeroPatente } = data;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, label } = {
    icon: "car1Bold",
    label: "",
  };

  const metadataListItems: MetadataListItem = {
    items: [
      {
        isVisible: !!numeroPatente,
        label: t("licenceDetails.info.number"),
        value: numeroPatente,
      },
    ],
  };

  const filteredMetadataListItems = metadataListItems.items.filter(
    (item) => item.isVisible !== false,
  );

  return (
    <CardInfo
      icon={<Icon fontSize="medium" name="driving" />}
      items={filteredMetadataListItems}
      title={t("licenceDetails.info.title")}
    />
  );
};
