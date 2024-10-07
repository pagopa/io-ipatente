import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconParking = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M10.5 16V8h2.667c.736 0 1.333.895 1.333 2s-.597 2-1.333 2H10.5" />
      <path d="M3 12a9 9 0 1 0 18.001 0A9 9 0 0 0 3 12Z" />
    </g>
  </SvgIcon>
);

export default IconParking;
