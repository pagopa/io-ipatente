import {
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  DialogProps as MuiDialogProps,
} from "@mui/material";
import { ReactNode } from "react";

import { Icon } from "../icon";

export type DialogProps = {
  body: ReactNode;
  onClose: () => void;
  title: string;
} & Pick<MuiDialogProps, "open">;

export const Dialog = ({ body, onClose, open, title }: DialogProps) => (
  <MuiDialog onClose={onClose} open={open}>
    <DialogTitle sx={{ m: 0, p: 2 }}>{title}</DialogTitle>
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        color: (theme) => theme.palette.grey[500],
        position: "absolute",
        right: 8,
        top: 8,
      }}
    >
      <Icon color="primary" name="closeCircle" />
    </IconButton>
    <DialogContent dividers>{body}</DialogContent>
  </MuiDialog>
);
