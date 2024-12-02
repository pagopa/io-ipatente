import { Pratica } from "@/generated/bff-openapi";
import { ListItemAction } from "@io-ipatente/ui";
// import { useTranslation } from "next-i18next";

export interface ListItemPracticeProps {
  data: Pratica;
  onClick: (licensePlate: string) => void;
}

export const ListItemPractice = ({ data, onClick }: ListItemPracticeProps) => {
  // const { t } = useTranslation();

  const { numeroPratica } = data;

  // const { icon, label } = todo

  return (
    <ListItemAction
      badges={[]}
      icon="error"
      label={`Pratica n.${numeroPratica}`}
      onClick={() => onClick(`${numeroPratica}`)}
      value={`${numeroPratica}`}
    />
  );
};
