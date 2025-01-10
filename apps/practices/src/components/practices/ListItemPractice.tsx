import { Pratica } from "@/generated/bff-openapi";
import { BadgeProps, ListItemAction } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

export interface ListItemPracticeProps {
  data: Pratica;
  onClick: (licensePlate: string) => void;
}

export const ListItemPractice = ({ data, onClick }: ListItemPracticeProps) => {
  const { t } = useTranslation();

  const { numeroPratica, statoPratica, tipoPratica } = data;

  const badges = useMemo<BadgeProps[]>(
    () => [
      {
        color: "info",
        label: statoPratica,
        size: "small",
      },
    ],
    [statoPratica],
  );

  return (
    <ListItemAction
      badges={badges}
      label={t("practiceDetails.practiceNumber", {
        practiceNumber: numeroPratica,
      })}
      onClick={() => onClick(`${numeroPratica}`)}
      value={tipoPratica.descrizione}
    />
  );
};
