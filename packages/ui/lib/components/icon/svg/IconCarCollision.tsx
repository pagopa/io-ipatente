import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconCarCollision = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M8 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
      <path d="M11 11 7 6H3m8 5h1a2 2 0 0 1 2 2v4h-2m-1-6H3m5 6H3m2-6V6M14 8V6M19 12h2M17.5 15.5 19 17M17.5 8.5 19 7" />
    </g>
  </SvgIcon>
);

export default IconCarCollision;
