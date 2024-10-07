import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconGasStation = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M14 11h1a2 2 0 0 1 2 2v3a1.5 1.5 0 1 0 3 0V9l-3-3M4 20V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14M3 20h12" />
      <path d="M18 7v1a1 1 0 0 0 1 1h1M4 11h10" />
    </g>
  </SvgIcon>
);

export default IconGasStation;
