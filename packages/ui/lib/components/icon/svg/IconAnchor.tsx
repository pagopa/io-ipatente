import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconAnchor = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      d="M12 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12 22V8M5 12H2a10 10 0 0 0 20 0h-3"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </SvgIcon>
);

export default IconAnchor;
