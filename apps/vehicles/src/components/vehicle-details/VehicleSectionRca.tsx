import { CoperturaRCA } from "@/generated/openapi";
import { CardInfo, CardInfoItem, Icon, IconType } from "@io-ipatente/ui";
import Chip, { ChipProps } from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { useTranslation } from "next-i18next";
import { useCallback, useMemo } from "react";

interface MetadataListItem {
  items: CardInfoItem[];
}

export interface VehicleSectionRcaProps {
  rca?: CoperturaRCA;
}

export const VehicleSectionRca = ({ rca }: VehicleSectionRcaProps) => {
  const { t } = useTranslation();

  const rcaStatus:
    | ({
        icon: IconType;
      } & Pick<ChipProps, "color" | "label">)
    | null = useMemo(() => {
    if (!rca) return null;
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

  const renderTopContent = useCallback(() => {
    if (rcaStatus) {
      return (
        <Chip
          color={rcaStatus.color}
          icon={<Icon fontSize="small" name={rcaStatus.icon} />}
          label={rcaStatus.label}
          size="small"
        />
      );
    }
    return (
      <Typography
        color="text.secondary"
        paddingTop={2}
        textAlign="center"
        variant="body2"
      >
        {t("vehicleDetails.rca.notFound")}
      </Typography>
    );
  }, [rcaStatus, t]);

  const metadataListItems: MetadataListItem | undefined = useMemo(
    () =>
      rca
        ? {
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
          }
        : undefined,
    [rca, t],
  );

  return (
    <CardInfo
      icon={<Icon fontSize="medium" name="securityUserBold" />}
      items={metadataListItems?.items}
      title={t("vehicleDetails.rca.title")}
      topContent={renderTopContent()}
    />
  );
};
