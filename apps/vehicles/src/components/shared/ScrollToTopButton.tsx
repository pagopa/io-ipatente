import { FloatingButton } from "@io-ipatente/ui";
import Fade from "@mui/material/Fade";
import Stack from "@mui/material/Stack";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { useCallback } from "react";

interface ScrollToTopButtonProps {
  container: HTMLElement | null;
}

export const ScrollToTopButton = ({ container }: ScrollToTopButtonProps) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
  });

  const handleClick = useCallback(() => {
    container?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [container]);

  return (
    <Fade in={trigger}>
      <Stack bottom={16} position="fixed" right={16} zIndex={2}>
        <FloatingButton
          color="secondary"
          icon="expandUp"
          onClick={handleClick}
        />
      </Stack>
    </Fade>
  );
};
