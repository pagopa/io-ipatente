import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useCallback } from "react";

import { FloatingButton } from "../floating-button";

interface ScrollToTopButtonProps {
  selector: string;
}

export const ScrollToTopButton = ({ selector }: ScrollToTopButtonProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const anchor = (
        (event.target as HTMLDivElement).ownerDocument || document
      ).querySelector(selector);

      if (anchor) {
        anchor.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    },
    [selector],
  );

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ bottom: 16, position: "fixed", right: 16 }}
      >
        <FloatingButton color="secondary" icon="expandUp" />
      </Box>
    </Fade>
  );
};
