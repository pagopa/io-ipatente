import { Pratica } from "@/generated/bff-openapi";
import { CardInfo, CardInfoItem, Icon } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";

interface MetadataListItem {
  items: ({ isVisible: boolean } & CardInfoItem)[];
}

export interface PracticeSectionDetailsProps {
  data: Pratica;
}

export const PracticeSectionDetails = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data,
}: PracticeSectionDetailsProps) => {
  const { t } = useTranslation();

  // const { dataApertura, numeroPratica, statoPratica, tipoPratica } = data;

  // const { icon, label } = todo

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
      title={t("practiceDetails.info.title")}
    />
  );
};
