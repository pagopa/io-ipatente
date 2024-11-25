import { DatiPatente } from "@/generated/bff-openapi";
import { LICENCE_TOTAL_POINTS } from "@/utils/constants";
import {
  CardInfo,
  CardInfoItem,
  CardInfoProps,
  Icon,
  ProgressBar,
} from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

interface MetadataListItem {
  items: ({ isVisible: boolean } & CardInfoItem)[];
}

export interface LicenceSectionDetailsProps {
  data: DatiPatente;
}

export const LicenceSectionDetails = ({ data }: LicenceSectionDetailsProps) => {
  const { t } = useTranslation();

  const { dataScadenza, numeroPatente, saldoPunti, tipoCqc } = data;

  const metadataListItems: MetadataListItem = {
    items: [
      {
        isVisible: !!tipoCqc?.descrizione,
        label: t("licenceDetails.info.documentType"),
        value: tipoCqc?.descrizione,
      },
      {
        isVisible: !!numeroPatente,
        label: t("licenceDetails.info.number"),
        value: numeroPatente,
      },
      {
        isVisible: !!dataScadenza,
        label: t("licenceDetails.info.expiryDate"),
        value: dataScadenza
          ? new Date(dataScadenza).toLocaleDateString()
          : null,
      },
    ],
  };

  const filteredMetadataListItems = metadataListItems.items.filter(
    (item) => item.isVisible !== false,
  );

  const topContent: CardInfoProps["topContent"] = useMemo(() => {
    if (saldoPunti === undefined) {
      return null;
    }

    return (
      <ProgressBar
        description={t("licenceDetails.info.points.description", {
          total: LICENCE_TOTAL_POINTS,
          value: saldoPunti,
        })}
        title={t("licenceDetails.info.points.title")}
        total={LICENCE_TOTAL_POINTS}
        value={saldoPunti}
      />
    );
  }, [saldoPunti, t]);

  return (
    <CardInfo
      icon={<Icon fontSize="medium" name="detail" />}
      items={filteredMetadataListItems}
      title={t("licenceDetails.info.title")}
      topContent={topContent}
    />
  );
};
