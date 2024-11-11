import { DatiPatente } from "@/generated/bff-openapi";
import { ListItemAction } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";

export interface ListItemLicenceProps {
  data: DatiPatente;
  onClick: (licenseNumber: string) => void;
}

export const ListItemLicence = ({ data, onClick }: ListItemLicenceProps) => {
  const { t } = useTranslation();

  const { numeroPatente } = data;

  return (
    <ListItemAction
      badges={[]}
      icon="driving"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      label={t(numeroPatente as any)}
      onClick={() => onClick(numeroPatente as string)}
      value={numeroPatente as string}
    />
  );
};
