import { CoperturaRCA } from "@/generated/openapi";
import { CardInfo, CardInfoItem, Icon, IconType } from "@io-ipatente/ui";
import Chip, { ChipProps } from "@mui/material/Chip";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

interface MetadataListItem {
  items: CardInfoItem[];
}

export interface VehicleSectionRcaProps {
  rca?: CoperturaRCA;
}

export const VehicleSectionRca = ({ rca }: VehicleSectionRcaProps) => {
  const { t } = useTranslation();

  const rcaStatus: {
    icon: IconType;
  } & Pick<ChipProps, "color" | "label"> = useMemo(() => {
    if (!rca) {
      return {
        icon: "forbidden",
        label: t("vehicleDetails.rca.notFound"),
      };
    }

    if (
      new Date(rca.dataScadenzaCopertura).setHours(0, 0, 0, 0) >=
      new Date().setHours(0, 0, 0, 0)
    ) {
      return {
        color: "success",
        icon: "tickCircleBold",
        label: t("vehicleDetails.rca.valid"),
      };
    }

    return {
      color: "error",
      icon: "warning2Bold",
      label: t("vehicleDetails.rca.expired"),
    };
  }, [rca, t]);

  if (rca === undefined) {
    return (
      <CardInfo
        icon={<Icon fontSize="medium" name="securityUserBold" />}
        title={t("vehicleDetails.rca.title")}
        topContent={
          <Chip
            color={rcaStatus.color}
            icon={<Icon fontSize="small" name={rcaStatus.icon} />}
            label={rcaStatus.label}
          />
        }
      />
    );
  }

  const metadataListItems: MetadataListItem = {
    items: [
      {
        label: t("vehicleDetails.rca.insuranceGroup"),
        value: rca.compagniaAssicuratrice,
      },
      {
        footerText: t("vehicleDetails.rca.info"),
        label: t("vehicleDetails.rca.dueDate"),
        value: rca.dataScadenzaCopertura,
      },
    ],
  };

  return (
    <CardInfo
      icon={<Icon fontSize="medium" name="securityUserBold" />}
      items={metadataListItems.items}
      title={t("vehicleDetails.rca.title")}
      topContent={
        <Chip
          color={rcaStatus.color}
          icon={<Icon fontSize="small" name={rcaStatus.icon} />}
          label={rcaStatus.label}
        />
      }
    />
  );
};
