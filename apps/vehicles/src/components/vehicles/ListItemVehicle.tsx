import { Veicolo } from "@/generated/bff-openapi";
import { vehicleByType } from "@/utils/constants";
import { isDueDateValid } from "@io-ipatente/core";
import { BadgeProps, ListItemAction } from "@io-ipatente/ui";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

export interface ListItemVehicleProps {
  data: Veicolo;
  onClick: (licensePlate: string) => void;
}

export const ListItemVehicle = ({ data, onClick }: ListItemVehicleProps) => {
  const { t } = useTranslation();

  const {
    coperturaRCA,
    storicoRevisioni = [],
    targaVeicolo,
    tipoVeicolo,
  } = data;

  const { icon, label } = vehicleByType[tipoVeicolo] ?? {
    icon: "car1",
    label: "vehicles.defaultLabel",
  };

  const rcaStatus: BadgeProps = useMemo(() => {
    if (!coperturaRCA) {
      return {
        icon: "forbidden",
        label: t("vehicles.rca"),
        size: "small",
      };
    }

    if (isDueDateValid(coperturaRCA.dataScadenzaCopertura)) {
      return {
        color: "success",
        icon: "tickCircleBold",
        label: t("vehicles.rca"),
        size: "small",
      };
    }

    return {
      color: "error",
      icon: "warning2Bold",
      label: t("vehicles.rca"),
      size: "small",
    };
  }, [coperturaRCA, t]);

  const inspectionStatus: BadgeProps = useMemo(() => {
    // TODO: Move sort logic to bff
    const inspection = storicoRevisioni.reduce(
      (prev, curr) =>
        new Date(prev.dataRevisione) > new Date(curr.dataRevisione)
          ? prev
          : curr,
      storicoRevisioni[0],
    );

    switch (inspection?.esitoRevisione.codice) {
      case "REV_MSG_001":
        return {
          color: "success",
          icon: "tickCircleBold",
          label: t("vehicles.inspection"),
          size: "small",
        };
      case "REV_MSG_002":
        return {
          color: "warning",
          icon: "warningBold",
          label: t("vehicles.inspection"),
          size: "small",
        };
      case "REV_MSG_003":
        return {
          color: "error",
          icon: "warning2Bold",
          label: t("vehicles.inspection"),
          size: "small",
        };
      default:
        return {
          color: "default",
          icon: "forbidden",
          label: t("vehicles.inspection"),
          size: "small",
        };
    }
  }, [storicoRevisioni, t]);

  return (
    <ListItemAction
      badges={[rcaStatus, inspectionStatus]}
      icon={icon}
      label={t(label)}
      onClick={() => onClick(targaVeicolo)}
      value={targaVeicolo}
    />
  );
};
