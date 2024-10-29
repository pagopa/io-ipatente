import {
  Box,
  Divider,
  ModalProps,
  Modal as MuiModal,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { ReactNode } from "react";

import { Icon } from "../icon";

type CustomModalProps = {
  body: ReactNode;
  close: () => void;
  title: ReactNode;
} & Pick<ModalProps, "open">;

export const Modal = ({ body, close, open, title }: CustomModalProps) => (
  <MuiModal open={open}>
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 24,
        left: "50%",
        position: "absolute",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "90%",
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        fontSize={24} // useful for inherited icon fontSize
        justifyContent="space-between"
        padding={1}
        spacing={1}
      >
        <Typography data-testid={`modal-title`} fontSize={20} fontWeight={600}>
          {title}
        </Typography>
        <Icon name="closeCircle" onClick={close} />
      </Stack>
      <Divider sx={{ marginBottom: 1.5 }} />
      <Stack padding={1}>{body}</Stack>
    </Box>
  </MuiModal>
);
