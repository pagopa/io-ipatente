import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconComponent = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M3 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM7 18h8m4 0h2v-6m0 0a5 5 0 0 0-5-5h-1l1.5 5H21ZM12 18V7h3" />
      <path d="M3 17v-5h9M4 12V6l18-3v2" />
      <path d="M8 12V8L4 6" />
    </g>
  </SvgIcon>
);

export default IconComponent;
