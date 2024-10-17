import type { ParseKeys } from "i18next";

import {
  EsitoRevisioneEnum,
  ExtraMassaEnum,
  NeopatentatiEnum,
  TipoVeicoloEnum,
} from "@/generated/openapi";
import { IconType } from "@io-ipatente/ui";
import { ChipProps } from "@mui/material/Chip";

// TODO: icon needs to be updated
export const vehicleByType: {
  [K in TipoVeicoloEnum]: { icon: IconType; label: ParseKeys };
} = {
  [TipoVeicoloEnum.Enum.A]: {
    icon: "car1",
    label: "vehicle.type.A",
  },
  [TipoVeicoloEnum.Enum.C]: {
    icon: "car1",
    label: "vehicle.type.C",
  },
  [TipoVeicoloEnum.Enum.CC]: {
    icon: "car1",
    label: "vehicle.type.CC",
  },
  [TipoVeicoloEnum.Enum.CD]: {
    icon: "car1",
    label: "vehicle.type.CD",
  },
  [TipoVeicoloEnum.Enum.E]: {
    icon: "car1",
    label: "vehicle.type.E",
  },
  [TipoVeicoloEnum.Enum.EE]: {
    icon: "car1",
    label: "vehicle.type.EE",
  },
  [TipoVeicoloEnum.Enum.F]: {
    icon: "car1",
    label: "vehicle.type.F",
  },
  [TipoVeicoloEnum.Enum.G]: {
    icon: "car1",
    label: "vehicle.type.G",
  },
  [TipoVeicoloEnum.Enum.H]: {
    icon: "car1",
    label: "vehicle.type.H",
  },
  [TipoVeicoloEnum.Enum.M]: {
    icon: "car1",
    label: "vehicle.type.M",
  },
  [TipoVeicoloEnum.Enum.N]: {
    icon: "car1",
    label: "vehicle.type.N",
  },
  [TipoVeicoloEnum.Enum.P]: {
    icon: "car1",
    label: "vehicle.type.P",
  },
  [TipoVeicoloEnum.Enum.R]: {
    icon: "car1",
    label: "vehicle.type.R",
  },
  [TipoVeicoloEnum.Enum.S]: {
    icon: "car1",
    label: "vehicle.type.S",
  },
  [TipoVeicoloEnum.Enum.T]: {
    icon: "car1",
    label: "vehicle.type.T",
  },
  [TipoVeicoloEnum.Enum.U]: {
    icon: "car1",
    label: "vehicle.type.U",
  },
  [TipoVeicoloEnum.Enum.V]: {
    icon: "car1",
    label: "vehicle.type.V",
  },
  [TipoVeicoloEnum.Enum.X]: {
    icon: "car1",
    label: "vehicle.type.X",
  },
  [TipoVeicoloEnum.Enum.Y]: {
    icon: "car1",
    label: "vehicle.type.Y",
  },
};

export const extraMassByCode: {
  [K in ExtraMassaEnum]: ParseKeys;
} = {
  [ExtraMassaEnum.Enum.EXTRAM_MSG_001]: "extraMass.EXTRAM_MSG_001",
  [ExtraMassaEnum.Enum.EXTRAM_MSG_002]: "extraMass.EXTRAM_MSG_002",
  [ExtraMassaEnum.Enum.EXTRAM_MSG_003]: "extraMass.EXTRAM_MSG_003",
  [ExtraMassaEnum.Enum.EXTRAM_MSG_004]: "extraMass.EXTRAM_MSG_004",
  [ExtraMassaEnum.Enum.EXTRAM_MSG_005]: "extraMass.EXTRAM_MSG_005",
};

export const noviceByCode: {
  [K in NeopatentatiEnum]: ParseKeys;
} = {
  [NeopatentatiEnum.Enum.NEOP_MSG_001]: "novice.EXTRAM_MSG_001",
  [NeopatentatiEnum.Enum.NEOP_MSG_002]: "novice.EXTRAM_MSG_002",
  [NeopatentatiEnum.Enum.NEOP_MSG_003]: "novice.EXTRAM_MSG_003",
};

export const inspectionResultByCode: {
  [K in EsitoRevisioneEnum]: {
    color: ChipProps["color"];
    icon: IconType;
    label: ParseKeys;
  };
} = {
  [EsitoRevisioneEnum.Enum.REV_MSG_001]: {
    color: "success",
    icon: "tickCircleBold",
    label: "inspection.REV_MSG_001",
  },
  [EsitoRevisioneEnum.Enum.REV_MSG_002]: {
    color: "warning",
    icon: "warningBold",
    label: "inspection.REV_MSG_002",
  },
  [EsitoRevisioneEnum.Enum.REV_MSG_003]: {
    color: "error",
    icon: "warning2Bold",
    label: "inspection.REV_MSG_003",
  },
};
