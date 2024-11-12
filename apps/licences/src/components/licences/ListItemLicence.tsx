import { DatiPatente } from "@/generated/bff-openapi";
import { BadgeProps, ListItemAction } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";
import { useCallback } from "react";

export interface ListItemLicenceProps {
  data: DatiPatente;
  label: string;
  onClick: (licenseNumber: string) => void;
}

const hasReachExpireDate = (expire_date: string): boolean => {
  const date_expire = new Date(expire_date);
  const today = new Date();
  return date_expire.setHours(0, 0, 0, 0) >= today.setHours(0, 0, 0, 0);
};

export const ListItemLicence = ({
  data,
  label,
  onClick,
}: ListItemLicenceProps) => {
  const { t } = useTranslation();

  const { dataScadenza, numeroPatente } = data;
  const getBadges = useCallback<() => BadgeProps[]>(() => {
    const isExpired = hasReachExpireDate(dataScadenza ?? "");

    return [
      {
        color: isExpired ? "warning" : "success",
        icon: isExpired ? "warning" : "success",
        label: isExpired ? "Scaduta" : "Valida",
      },
    ];
  }, [dataScadenza]);

  return (
    <ListItemAction
      badges={getBadges()}
      icon="licenceCard"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      label={t(label as any)}
      onClick={() => onClick(numeroPatente as string)}
      value={numeroPatente as string}
    />
  );
};
