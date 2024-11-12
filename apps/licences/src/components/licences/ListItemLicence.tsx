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
        icon: isValid ? "success" : "warning",
        label: isValid ? "Valida" : "Scaduta",
      },
    ];
  }, [dataScadenza]);

  return (
    <ListItemAction
      badges={badges}
      icon="licenceCard"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      label={t(label as any)}
      onClick={() => onClick(numeroPatente as string)}
      value={numeroPatente as string}
    />
  );
};
