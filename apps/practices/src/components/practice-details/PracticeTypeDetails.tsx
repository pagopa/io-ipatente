import { Pratica } from "@/generated/bff-openapi";
import { CardInfo, CardInfoItem, Icon } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";

interface MetadataListItem {
  items: ({ isVisible: boolean } & CardInfoItem)[];
}

interface PracticeTypeDetailsProps {
  tipoPratica: Pratica["tipoPratica"];
}

export const PracticeTypeDetails = ({
  tipoPratica,
}: PracticeTypeDetailsProps) => {
  const { t } = useTranslation();

  const { codice, descrizione } = tipoPratica;

  const metadataListItems: MetadataListItem = {
    items: [
      {
        isVisible: !!codice,
        label: t("practiceDetails.type.code"),
        value: codice,
      },
      {
        isVisible: !!descrizione,
        label: t("practiceDetails.type.description"),
        value: descrizione,
      },
    ],
  };

  const filteredMetadataListItems = metadataListItems.items.filter(
    (item) => item.isVisible !== false,
  );
  return (
    <CardInfo
      icon={<Icon fontSize="medium" name="documentText" />}
      items={filteredMetadataListItems}
      title={t("practiceDetails.type.title")}
    />
  );
};
