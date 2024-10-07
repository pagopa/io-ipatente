import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconCar2 = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      d="M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M5 17H3v-6m0 0 2-5h9l4 5M3 11h15m0 0h1a2 2 0 0 1 2 2v4h-2m-4 0H9m3-6V6"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </SvgIcon>
);

export default IconCar2;
