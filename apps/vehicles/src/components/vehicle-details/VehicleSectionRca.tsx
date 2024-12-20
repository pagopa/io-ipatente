import { CoperturaRCA } from "@/generated/bff-openapi";
import { isDueDateValid } from "@io-ipatente/core";
import { CardInfo, CardInfoItem, CardInfoProps, Icon } from "@io-ipatente/ui";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

export interface VehicleSectionRcaProps {
  rca?: CoperturaRCA;
}

export const VehicleSectionRca = ({ rca }: VehicleSectionRcaProps) => {
  const { t } = useTranslation();

  const topContent: CardInfoProps["topContent"] = useMemo(() => {
    if (!rca) {
      return (
        <Typography
          color="text.secondary"
          paddingTop={2}
          textAlign="center"
          variant="body2"
        >
          {t("vehicleDetails.rca.empty")}
        </Typography>
      );
    }

    if (isDueDateValid(rca.dataScadenzaCopertura)) {
      return (
        <Chip
          color="success"
          icon={<Icon fontSize="small" name="tickCircleBold" />}
          label={t("vehicleDetails.rca.valid")}
          size="small"
        />
      );
    }

    return (
      <Chip
        color="error"
        icon={<Icon fontSize="small" name="warning2Bold" />}
        label={t("vehicleDetails.rca.expired")}
        size="small"
      />
    );
  }, [rca, t]);

  const metadataListItems: CardInfoItem[] | undefined = useMemo(() => {
    if (!rca) {
      return undefined;
    }

    return [
      {
        label: t("vehicleDetails.rca.insuranceGroup"),
        value: rca.compagniaAssicuratrice,
      },
      {
        label: t("vehicleDetails.rca.dueDate"),
        value: new Date(rca.dataScadenzaCopertura).toLocaleDateString(),
      },
    ];
  }, [rca, t]);

  return (
    <CardInfo
      icon={<Icon fontSize="medium" name="securityUserBold" />}
      items={metadataListItems}
      title={t("vehicleDetails.rca.title")}
      topContent={topContent}
    />
  );
};
