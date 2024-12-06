import { SvgIconProps } from "@mui/material/SvgIcon";

import IconAirplane from "./svg/IconAirplane";
import IconAlarm from "./svg/IconAlarm";
import IconAnchor from "./svg/IconAnchor";
import IconArrowCircleLeftBold from "./svg/IconArrowCircleLeftBold";
import IconArrowCircleRightBold from "./svg/IconArrowCircleRightBold";
import IconBus from "./svg/IconBus";
import IconBusStation from "./svg/IconBusStation";
import IconCallBold from "./svg/IconCallBold";
import IconCar1 from "./svg/IconCar1";
import IconCar1Bold from "./svg/IconCar1Bold";
import IconCar2 from "./svg/IconCar2";
import IconCarCollision from "./svg/IconCarCollision";
import IconCarGearbox from "./svg/IconCarGearbox";
import IconCarParking from "./svg/IconCarParking";
import IconCaravan from "./svg/IconCaravan";
import IconCloseCircle from "./svg/IconCloseCircle";
import IconComponent from "./svg/IconComponent";
import IconDetail from "./svg/IconDetail";
import IconDocumentText from "./svg/IconDocumentText";
import IconDownload from "./svg/IconDownload";
import IconDriveLicense from "./svg/IconDriveLicense";
import IconDriving from "./svg/IconDriving";
import IconEletricMoped from "./svg/IconEletricMoped";
import IconError from "./svg/IconError";
import IconExpandUp from "./svg/IconExpandUp";
import IconFerryBoat from "./svg/IconFerryBoat";
import IconFolderCrossBold from "./svg/IconFolderCrossBold";
import IconForbidden from "./svg/IconForbidden";
import IconGasStation from "./svg/IconGasStation";
import IconGasStationOff from "./svg/IconGasStationOff";
import IconHambulance from "./svg/IconHambulance";
import IconInfo from "./svg/IconInfo";
import IconMailSendBold from "./svg/IconMailSendBold";
import IconMetro from "./svg/IconMetro";
import IconMoped from "./svg/IconMoped";
import IconMotor from "./svg/IconMotor";
import IconMotorbike1 from "./svg/IconMotorbike1";
import IconMotorbike2 from "./svg/IconMotorbike2";
import IconParking from "./svg/IconParking";
import IconRefresh2 from "./svg/IconRefresh2";
import IconRoad from "./svg/IconRoad";
import IconSailboat from "./svg/IconSailboat";
import IconScooter from "./svg/IconScooter";
import IconSecurityUserBold from "./svg/IconSecurityUserBold";
import IconSmartCar from "./svg/IconSmartCar";
import IconSpeedometer from "./svg/IconSpeedometer";
import IconSuccess from "./svg/IconSuccess";
import IconTickCircleBold from "./svg/IconTickCircleBold";
import IconTruck from "./svg/IconTruck";
import IconTruckFast from "./svg/IconTruckFast";
import IconWallet from "./svg/IconWallet";
import IconWarning from "./svg/IconWarning";
import IconWarning2Bold from "./svg/IconWarning2Bold";
import IconWarningBold from "./svg/IconWarningBold";
import IconYacth from "./svg/IconYacth";

export const Icons = {
  airplane: IconAirplane,
  alarm: IconAlarm,
  anchor: IconAnchor,
  arrowCircleLeftBold: IconArrowCircleLeftBold,
  arrowCircleRightBold: IconArrowCircleRightBold,
  bus: IconBus,
  busStation: IconBusStation,
  callBold: IconCallBold,
  car1: IconCar1,
  car1Bold: IconCar1Bold,
  car2: IconCar2,
  carCollision: IconCarCollision,
  carGearbox: IconCarGearbox,
  carParking: IconCarParking,
  caravan: IconCaravan,
  closeCircle: IconCloseCircle,
  component: IconComponent,
  detail: IconDetail,
  documentText: IconDocumentText,
  download: IconDownload,
  driveLicense: IconDriveLicense,
  driving: IconDriving,
  eletricMoped: IconEletricMoped,
  error: IconError,
  expandUp: IconExpandUp,
  ferryBoat: IconFerryBoat,
  folderCrossBold: IconFolderCrossBold,
  forbidden: IconForbidden,
  gasStation: IconGasStation,
  gasStationOff: IconGasStationOff,
  hambulance: IconHambulance,
  info: IconInfo,
  mailSendBold: IconMailSendBold,
  metro: IconMetro,
  moped: IconMoped,
  motor: IconMotor,
  motorbike1: IconMotorbike1,
  motorbike2: IconMotorbike2,
  parking: IconParking,
  refresh2: IconRefresh2,
  road: IconRoad,
  sailboat: IconSailboat,
  scooter: IconScooter,
  securityUserBold: IconSecurityUserBold,
  smartCar: IconSmartCar,
  speedometer: IconSpeedometer,
  success: IconSuccess,
  tickCircleBold: IconTickCircleBold,
  truck: IconTruck,
  truckFast: IconTruckFast,
  wallet: IconWallet,
  warning: IconWarning,
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
