import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconSpeedometer = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M10 13a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM13.45 11.55 15.5 9.5" />
      <path d="M6.4 20a9 9 0 1 1 11.2 0H6.4Z" />
    </g>
  </SvgIcon>
);

export default IconSpeedometer;
