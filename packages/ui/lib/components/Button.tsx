import Button from "@mui/material/Button";

export interface UIButtonProps {
  label: string;
  onClick: () => void;
  variant?: "contained" | "naked" | "outlined" | "text";
}

const UIButton = ({ label, onClick, variant = "contained" }: UIButtonProps) => (
  <Button
    color="primary"
    data-testid="io-ipatente-button"
    onClick={onClick}
    variant={variant}
  >
    {label}
  </Button>
);

export default UIButton;
