import { ExtraMassaEnum, Veicolo } from "@/generated/bff-openapi";
import { extraMassByCode, noviceByCode, vehicleByType } from "@/utils/strings";
import { CardInfo, CardInfoItem, Icon, useDialog } from "@io-ipatente/ui";
import { Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

interface MetadataListItem {
  items: ({ isVisible: boolean } & CardInfoItem)[];
}

export interface VehicleSectionDetailsProps {
  data: Veicolo;
}

export const VehicleSectionDetails = ({ data }: VehicleSectionDetailsProps) => {
  const { t } = useTranslation();

  const { showDialog } = useDialog();

  const { datiVeicolo, targaVeicolo, tipoVeicolo } = data;

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
        value: t(vehicleByType[tipoVeicolo].label),
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
        icon: (
          <Icon
            name="info"
            onClick={() => {
              showDialog({
                body: renderExtraMassBody(
                  datiVeicolo?.extraMassa?.codice,
                  datiVeicolo?.extraMassa?.descrizione,
                ),
                title: t("vehicleDetails.info.extraMass"),
              });
            }}
          />
        ),
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

  const renderExtraMassBody = (code?: ExtraMassaEnum, description?: string) => (
    <Stack spacing={3}>
      <Stack alignItems="center">
        {EXTRA_MASS_ICON_MAP[code ?? ExtraMassaEnum.Enum.EXTRAM_MSG_005]}
      </Stack>
      <Typography textAlign="center" variant="body1">
        {description}
      </Typography>
    </Stack>
  );

  return (
    <CardInfo
      icon={<Icon fontSize="medium" name="detail" />}
      items={filteredMetadataListItems}
      title={t("vehicleDetails.info.title")}
    />
  );
};

const EXTRA_MASS_ICON_MAP: Record<ExtraMassaEnum, ReactNode> = {
  [ExtraMassaEnum.Enum.EXTRAM_MSG_001]: (
    <Icon fontSize="large" name="success" />
  ),
  [ExtraMassaEnum.Enum.EXTRAM_MSG_002]: (
    <Icon fontSize="large" name="warning" />
  ),
  [ExtraMassaEnum.Enum.EXTRAM_MSG_003]: (
    <Icon fontSize="large" name="warning" />
  ),
  [ExtraMassaEnum.Enum.EXTRAM_MSG_004]: (
    <Icon fontSize="large" name="warning" />
  ),
  [ExtraMassaEnum.Enum.EXTRAM_MSG_005]: <Icon fontSize="large" name="error" />,
  [ExtraMassaEnum.Enum.EXTRAM_MSG_006]: <Icon fontSize="large" name="error" />,
};
