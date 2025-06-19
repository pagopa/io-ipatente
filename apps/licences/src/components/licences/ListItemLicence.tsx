import { DatiPatente } from "@/generated/bff-openapi";
import { LICENCE_TOTAL_POINTS } from "@/utils/constants";
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

  const { numeroPatente, saldoPunti } = data;

  const badges = useMemo<BadgeProps[]>(() => {
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

    return badgeLicencePoints ? [badgeLicencePoints] : [];
  }, [saldoPunti, t]);

  return (
    <ListItemAction
      badges={badges}
      label={label}
      onClick={() => onClick(numeroPatente)}
      value={numeroPatente}
    />
  );
};
