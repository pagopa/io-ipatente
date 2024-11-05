import {
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
  Typography,
} from "@mui/material";
import { ReactNode } from "react";

import { Icon } from "../icon";

export type DialogProps = {
  body: ReactNode;
  onClose: () => void;
  title: string;
} & Pick<MuiDialogProps, "open">;

export const Dialog = ({ body, onClose, open, title }: DialogProps) => (
  <MuiDialog fullWidth={true} maxWidth="md" onClose={onClose} open={open}>
    <DialogTitle
      component="div"
      sx={{ alignItems: "center", display: "flex", p: 2 }}
    >
      <Typography variant="h6">{title}</Typography>
      <IconButton onClick={onClose} sx={{ ml: "auto" }}>
        <Icon color="primary" name="closeCircle" />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>{body}</DialogContent>
  </MuiDialog>
);
