import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconHambulance = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM15 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
      <path d="M5 17H3V6a1 1 0 0 1 1-1h9v6m0 6v-6m-4 6h6m4 0h2v-6m0 0h-8m8 0-3-5h-5M6 10h4M8 8v4" />
    </g>
  </SvgIcon>
);

export default IconHambulance;
