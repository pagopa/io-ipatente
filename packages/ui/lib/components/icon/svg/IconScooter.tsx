import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconScooter = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M16 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM5 16v1a2 2 0 0 0 4 0v-5H6a3 3 0 0 0-3 3v1h10a6 6 0 0 1 5-4V7a2 2 0 0 0-2-2h-1M6 9h3" />
    </g>
  </SvgIcon>
);

export default IconScooter;
