import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

const IconRoad = (props: SvgIconProps) => (
  <SvgIcon viewBox="0 0 24 24" {...props}>
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
    >
      <path d="M4 19 8 5M16 5l4 14M12 8V6M12 13v-2M12 18v-2" />
    </g>
  </SvgIcon>
);

export default IconRoad;
