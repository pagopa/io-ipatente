import { Veicolo } from "@/generated/bff-openapi";
import { extraMassByCode, noviceByCode, vehicleByType } from "@/utils/strings";
import { CardInfo, CardInfoItem, Icon } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";

interface MetadataListItem {
  items: ({ isVisible: boolean } & CardInfoItem)[];
}

export interface VehicleSectionDetailsProps {
  data: Veicolo;
}

export const VehicleSectionDetails = ({ data }: VehicleSectionDetailsProps) => {
  const { t } = useTranslation();

  const { datiVeicolo, targaVeicolo, tipoVeicolo } = data;

  const { icon, label } = vehicleByType[tipoVeicolo] ?? {
    icon: "car1Bold",
    label: "vehicles.defaultLabel",
  };

  const metadataListItems: MetadataListItem = {
    items: [
      {
        isVisible: !!targaVeicolo,
        label: t("vehicleDetails.info.plate"),
        value: targaVeicolo,
      },
      {
        isVisible: !!tipoVeicolo,
        label: t("vehicleDetails.info.type"),
        value: t(label),
      },
      {
        isVisible: !!datiVeicolo?.tipoUsoVeicolo,
        label: t("vehicleDetails.info.use"),
        value: datiVeicolo?.tipoUsoVeicolo,
      },
      {
        isVisible: !!datiVeicolo?.tipoDestinazioneUsoVeicolo,
        label: t("vehicleDetails.info.purpose"),
        value: datiVeicolo?.tipoDestinazioneUsoVeicolo,
      },
      {
        isVisible: !!datiVeicolo?.extraMassa?.codice,
        label: t("vehicleDetails.info.extraMass"),
        value: t(
          extraMassByCode[datiVeicolo?.extraMassa?.codice ?? "EXTRAM_MSG_005"],
        ),
      },
      {
        isVisible: !!datiVeicolo?.classeAmbientale,
        label: t("vehicleDetails.info.emissionClass"),
        value: datiVeicolo?.classeAmbientale,
      },
      {
        isVisible: !!datiVeicolo?.neopatentati?.descrizione,
        label: t("vehicleDetails.info.noviceDriver"),
        value: t(
          noviceByCode[datiVeicolo?.neopatentati?.codice ?? "NEOP_MSG_001"],
        ),
      },
    ],
  };

  const filteredMetadataListItems = metadataListItems.items.filter(
    (item) => item.isVisible !== false,
  );

  return (
    <CardInfo
      icon={<Icon fontSize="medium" name={icon} />}
      items={filteredMetadataListItems}
      title={t("vehicleDetails.info.title")}
    />
  );
};
