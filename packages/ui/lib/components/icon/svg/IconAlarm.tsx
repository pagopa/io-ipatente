import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconAlarm = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <path
      d="M2 22h20M12 6a9 9 0 0 0-9 9v7h18v-7a9 9 0 0 0-9-9ZM12 2v1M4 4l1 1M20 4l-1 1"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    />
  </SvgIcon>
);

export default IconAlarm;
