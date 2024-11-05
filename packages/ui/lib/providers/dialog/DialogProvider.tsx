import { PropsWithChildren, createContext, useCallback, useState } from "react";

import { Dialog, DialogProps } from "../../components";

interface ShowDialogProps extends Omit<DialogProps, "onClose" | "open"> {
  onClose?: DialogProps["onClose"];
}

export interface DialogContextProps {
  showDialog: (props: ShowDialogProps) => void;
}

export const DialogContext = createContext<DialogContextProps | undefined>(
  undefined,
);

export const DialogProvider = ({ children }: PropsWithChildren) => {
  const [dialogConfig, setDialogConfig] = useState<ShowDialogProps | null>(
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
