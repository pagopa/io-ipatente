import { useContext } from "react";

import { DialogContext, DialogContextProps } from "../../providers/dialog";

export const useDialog = (): DialogContextProps => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog must be used within a DialogProvider");
  }
  return context;
};
