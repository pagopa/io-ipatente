import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconBusStation = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M3 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4ZM16 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
      <path d="M10 5h7c2.761 0 5 3.134 5 7v5h-2M16 17H8" />
      <path d="m16 5 1.5 7H22M9.5 10H17M12 5v5M5 9v11" />
    </g>
  </SvgIcon>
);

export default IconBusStation;
