import { createContext, PropsWithChildren, useCallback, useState } from "react";

import { Dialog, DialogProps } from "../../components";

export interface DialogContextProps {
  showDialog: (props: ShowDialogProps) => void;
}

interface ShowDialogProps extends Omit<DialogProps, "onClose" | "open"> {
  onClose?: DialogProps["onClose"];
}

export const DialogContext = createContext<DialogContextProps | undefined>(
  undefined,
);

export const DialogProvider = ({ children }: PropsWithChildren) => {
  const [dialogConfig, setDialogConfig] = useState<null | ShowDialogProps>(
    null,
  );

  const showDialog = useCallback((dialogProps: ShowDialogProps) => {
    setDialogConfig(dialogProps);
  }, []);

  const closeDialog = useCallback(() => {
    dialogConfig?.onClose?.();
    setDialogConfig(null);
  }, []);

  return (
    <DialogContext.Provider value={{ showDialog }}>
      {children}
      {dialogConfig && (
        <Dialog {...dialogConfig} onClose={closeDialog} open={!!dialogConfig} />
      )}
    </DialogContext.Provider>
  );
};
