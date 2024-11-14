import { DatiPatente } from "@/generated/bff-openapi";
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

  const { dataScadenza, numeroPatente } = data;

  const badges = useMemo<BadgeProps[]>(() => {
    const isValid =
      new Date(dataScadenza ?? "").setHours(0, 0, 0, 0) >=
      new Date().setHours(0, 0, 0, 0);

    return [
      {
        color: isValid ? "success" : "warning",
        icon: isValid ? "tickCircleBold" : "warning2Bold",
        label: isValid ? t("licences.valid") : t("licences.expired"),
        size: "small",
      },
    ];
  }, [dataScadenza, t]);

  return (
    <ListItemAction
      badges={badges}
      icon="driveLicense"
      label={label}
      onClick={() => onClick(numeroPatente)}
      value={numeroPatente}
    />
  );
};
