import { DatiPatente } from "@/generated/bff-openapi";
import { LICENCE_TOTAL_POINTS } from "@/utils/constants";
import { isDueDateValid } from "@io-ipatente/core";
import { BadgeProps, ListItemAction } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

export interface ListItemLicenceProps {
  data: DatiPatente;
  label: string;
  onClick: (licenseNumber: string) => void;
}

export const ListItemLicence = ({
  data,
  label,
  onClick,
}: ListItemLicenceProps) => {
  const { t } = useTranslation();

  const { dataScadenza, numeroPatente, saldoPunti } = data;

  const badges = useMemo<BadgeProps[]>(() => {
    const isValid = dataScadenza ? isDueDateValid(dataScadenza) : false;

    const badgeLicenceStatus: BadgeProps = {
      color: isValid ? "success" : "error",
      icon: isValid ? "tickCircleBold" : "warning2Bold",
      label: isValid ? t("licences.valid") : t("licences.expired"),
      size: "small",
    };

    const badgeLicencePoints: BadgeProps | undefined = saldoPunti
      ? {
          color: "info",
          icon: "driveLicense",
          label: t("licences.points", {
            total: LICENCE_TOTAL_POINTS,
            value: saldoPunti,
          }),
          size: "small",
        }
      : undefined;

    return [
      badgeLicenceStatus,
      ...(badgeLicencePoints ? [badgeLicencePoints] : []),
    ];
  }, [dataScadenza, saldoPunti, t]);

  return (
    <ListItemAction
      badges={badges}
      label={label}
      onClick={() => onClick(numeroPatente)}
      value={numeroPatente}
    />
  );
};
