import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { SvgIconProps } from "@mui/material/SvgIcon";

import IconAirplane from "./svg/IconAirplane";
import IconAlarm from "./svg/IconAlarm";
import IconAnchor from "./svg/IconAnchor";
import IconArrowCircleLeftBold from "./svg/IconArrowCircleLeftBold";
import IconArrowCircleRightBold from "./svg/IconArrowCircleRightBold";
import IconBus from "./svg/IconBus";
import IconBusStation from "./svg/IconBusStation";
import IconCar1 from "./svg/IconCar1";
import IconCar1Bold from "./svg/IconCar1Bold";
import IconCar2 from "./svg/IconCar2";
import IconCarCollision from "./svg/IconCarCollision";
import IconCarGearbox from "./svg/IconCarGearbox";
import IconCarParking from "./svg/IconCarParking";
import IconCaravan from "./svg/IconCaravan";
import IconComponent from "./svg/IconComponent";
import IconDocumentText from "./svg/IconDocumentText";
import IconDriving from "./svg/IconDriving";
import IconEletricMoped from "./svg/IconEletricMoped";
import IconFerryBoat from "./svg/IconFerryBoat";
import IconForbidden from "./svg/IconForbidden";
import IconGasStation from "./svg/IconGasStation";
import IconGasStationOff from "./svg/IconGasStationOff";
import IconHambulance from "./svg/IconHambulance";
import IconMetro from "./svg/IconMetro";
import IconMoped from "./svg/IconMoped";
import IconMotor from "./svg/IconMotor";
import IconMotorbike1 from "./svg/IconMotorbike1";
import IconMotorbike2 from "./svg/IconMotorbike2";
import IconParking from "./svg/IconParking";
import IconRoad from "./svg/IconRoad";
import IconSailboat from "./svg/IconSailboat";
import IconScooter from "./svg/IconScooter";
import IconSecurityUserBold from "./svg/IconSecurityUserBold";
import IconSmartCar from "./svg/IconSmartCar";
import IconSpeedometer from "./svg/IconSpeedometer";
import IconTickCircleBold from "./svg/IconTickCircleBold";
import IconTruck from "./svg/IconTruck";
import IconTruckFast from "./svg/IconTruckFast";
import IconWarning2Bold from "./svg/IconWarning2Bold";
import IconWarningBold from "./svg/IconWarningBold";
import IconYacth from "./svg/IconYacth";

export const Icons = {
  airplane: IconAirplane,
  alarm: IconAlarm,
  anchor: IconAnchor,
  arrowBack: ArrowBackIcon,
  arrowCircleLeftBold: IconArrowCircleLeftBold,
  arrowCircleRightBold: IconArrowCircleRightBold,
  bus: IconBus,
  busStation: IconBusStation,
  car1: IconCar1,
  car1Bold: IconCar1Bold,
  car2: IconCar2,
  carCollision: IconCarCollision,
  carGearbox: IconCarGearbox,
  carParking: IconCarParking,
  caravan: IconCaravan,
  component: IconComponent,
  documentText: IconDocumentText,
  driving: IconDriving,
  eletricMoped: IconEletricMoped,
  ferryBoat: IconFerryBoat,
  forbidden: IconForbidden,
  gasStation: IconGasStation,
  gasStationOff: IconGasStationOff,
  hambulance: IconHambulance,
  metro: IconMetro,
  moped: IconMoped,
  motor: IconMotor,
  motorbike1: IconMotorbike1,
  motorbike2: IconMotorbike2,
  parking: IconParking,
  road: IconRoad,
  sailboat: IconSailboat,
  scooter: IconScooter,
  securityUserBold: IconSecurityUserBold,
  smartCar: IconSmartCar,
  speedometer: IconSpeedometer,
  tickCircleBold: IconTickCircleBold,
  truck: IconTruck,
  truckFast: IconTruckFast,
  warning2Bold: IconWarning2Bold,
  warningBold: IconWarningBold,
  yacth: IconYacth,
} as const;

export type IconType = keyof typeof Icons;

export type IconProps = {
  name: IconType;
} & SvgIconProps;

export const Icon = ({ fontSize = "small", name, ...props }: IconProps) => {
  const IconElement = Icons[name];
  return <IconElement fontSize={fontSize} {...props} />;
};
