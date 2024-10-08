import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconBus = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <g
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M4 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0ZM16 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0Z" />
      <path d="M4 17H2V6a1 1 0 0 1 1-1h14c1.326 0 2.598.737 3.535 2.05C21.473 8.363 22 10.143 22 12v5h-2m-4 0H8" />
      <path d="m16 5 1.5 7H22M2 10h15M7 5v5M12 5v5" />
    </g>
  </SvgIcon>
);

export default IconBus;
