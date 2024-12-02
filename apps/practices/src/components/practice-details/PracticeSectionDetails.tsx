import { Pratica } from "@/generated/bff-openapi";
import { CardInfo, CardInfoItem, Icon } from "@io-ipatente/ui";
import { Chip } from "@mui/material";
import { useTranslation } from "next-i18next";

interface MetadataListItem {
  items: ({ isVisible: boolean } & CardInfoItem)[];
}

export interface PracticeSectionDetailsProps {
  data: Pratica;
}

export interface PracticeSectionTypeDetailsProps {
  tipoPratica: Pratica["tipoPratica"];
}

export const PracticeSectionDetails = ({
  data,
}: PracticeSectionDetailsProps) => {
  const { t } = useTranslation();

  const { dataApertura, numeroPratica, statoPratica, tipoPratica } = data;

  const metadataListItems: MetadataListItem = {
    items: [
      {
        isVisible: !!numeroPratica,
        label: t("practiceDetails.info.practiceNumber"),
        value: `${numeroPratica}`,
      },
      {
        isVisible: !!statoPratica,
        label: t("practiceDetails.info.practiceStatus"),
        value: statoPratica && (
          <Chip color="info" key={statoPratica} label={statoPratica} />
        ),
      },
      {
        isVisible: !!dataApertura,
        label: t("practiceDetails.info.practiceStartDate"),
        value: dataApertura
          ? new Date(dataApertura).toLocaleDateString()
          : null,
      },
      {
        isVisible: !!tipoPratica.codice,
        label: t("practiceDetails.info.practiceType"),
        value: tipoPratica.codice,
      },
      {
        isVisible: !!tipoPratica.descrizione,
        label: t("practiceDetails.info.practiceDescription"),
        value: tipoPratica.descrizione,
      },
    ],
  };

  const filteredMetadataListItems = metadataListItems.items.filter(
    (item) => item.isVisible !== false,
  );

  return (
    <CardInfo
      items={filteredMetadataListItems}
      title={t("practiceDetails.info.title")}
    />
  );
};

export const PracticeTypeDetails = ({
  tipoPratica,
}: PracticeSectionTypeDetailsProps) => {
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
