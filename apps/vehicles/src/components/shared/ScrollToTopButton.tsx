import { useScrollTop } from "@/hooks/useScrollTop";
import { FloatingButton } from "@io-ipatente/ui";
import { Stack } from "@mui/material";
import { forwardRef } from "react";

export const ScrollToTopButton = forwardRef<HTMLDivElement | undefined>(
  (_, ref) => {
    const { canGoUp, scrollToTop } = useScrollTop({
      containerRef: ref,
      offset: 100,
    });

    return canGoUp ? (
      <Stack bottom={16} position="fixed" right={16} zIndex={2}>
        <FloatingButton
          color="secondary"
          icon="expandUp"
          onClick={scrollToTop}
        />
      </Stack>
    ) : null;
  },
);

ScrollToTopButton.displayName = "ScrollToTopButton";
