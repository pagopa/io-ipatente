import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconExpandUp = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      d="M19.9201 19L13.0001 12C12.2301 11.23 11.7701 11.23 11.0001 12L4.08008 19"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
    <path
      d="M19.9201 12L13.0001 5C12.2301 4.23 11.7701 4.23 11.0001 5L4.08008 12"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </SvgIcon>
);

export default IconExpandUp;
