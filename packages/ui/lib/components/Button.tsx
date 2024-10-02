import Button from "@mui/material/Button";

export type UIButtonProps = {
  label: string;
  variant?: "contained" | "naked" | "outlined" | "text";
  onClick: () => void;
};

const UIButton = ({ label, variant = "contained", onClick }: UIButtonProps) => {
  return (
    <Button
      data-testid="io-ipatente-button"
      variant={variant}
      color="primary"
      onClick={() => onClick()}
    >
      {label}
    </Button>
  );
};

export default UIButton;
