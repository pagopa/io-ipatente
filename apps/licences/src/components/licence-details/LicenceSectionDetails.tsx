import { DatiPatente } from "@/generated/bff-openapi";
import { CardInfo, CardInfoItem, Icon, ProgressBar } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";

interface MetadataListItem {
  items: ({ isVisible: boolean } & CardInfoItem)[];
}

export interface LicenceSectionDetailsProps {
  data: DatiPatente;
}

const totalPoints = 30;

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
        value: new Date(dataScadenza || "").toLocaleDateString(),
      },
    ],
  };

  const filteredMetadataListItems = metadataListItems.items.filter(
    (item) => item.isVisible !== false,
  );

  return (
    <CardInfo
      icon={<Icon fontSize="medium" name="detail" />}
      items={filteredMetadataListItems}
      title={t("licenceDetails.info.title")}
      topContent={
        saldoPunti && (
          <ProgressBar
            description={t("licenceDetails.info.points.description", {
              total: totalPoints,
              value: saldoPunti,
            })}
            title={t("licenceDetails.info.points.title")}
            total={totalPoints}
            value={saldoPunti}
          />
        )
      }
    />
  );
};
