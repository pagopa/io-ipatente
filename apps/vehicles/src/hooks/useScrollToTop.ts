import { useCallback, useEffect, useState } from "react";

interface ScrollTopProps {
  container: HTMLElement | null;
  threshold: number;
}

export const useScrollToTop = ({ container, threshold }: ScrollTopProps) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const handleScroll = useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement;
      setIsButtonVisible(target?.scrollTop > threshold);
    },
    [threshold],
  );

  useEffect(() => {
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, container]);

  const scrollToTop = useCallback(() => {
    container?.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, [container]);

  return { isButtonVisible, scrollToTop };
};
