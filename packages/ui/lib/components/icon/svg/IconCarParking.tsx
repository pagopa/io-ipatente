import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconCarParking = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M5 20a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM15 20a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
      <path d="M5 20H3v-6m0 0 2-5h9l4 5M3 14h15m0 0h1a2 2 0 0 1 2 2v4h-2m-4 0H9m3-6V9M3 6l9-4 9 4" />
    </g>
  </SvgIcon>
);

export default IconCarParking;
