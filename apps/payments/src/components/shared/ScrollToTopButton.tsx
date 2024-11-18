import { useScrollToTop } from "@/hooks/useScrollToTop";
import { FloatingButton } from "@io-ipatente/ui";
import { Stack } from "@mui/material";
interface ScrollToTopButtonProps {
  container: HTMLElement | null;
}
export const ScrollToTopButton = ({ container }: ScrollToTopButtonProps) => {
  const { isButtonVisible, scrollToTop } = useScrollToTop({
    container,
    threshold: 100,
  });

  if (!isButtonVisible) return null;

  return (
    <Stack bottom={16} position="fixed" right={16} zIndex={2}>
      <FloatingButton color="secondary" icon="expandUp" onClick={scrollToTop} />
    </Stack>
  );
};
