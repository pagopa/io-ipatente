import {
  ForwardedRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";

interface ScrollTopProps {
  containerRef:
    | ForwardedRef<HTMLDivElement | undefined>
    | MutableRefObject<HTMLDivElement | undefined>;
  offset: number;
}

export const useScrollTop = ({ containerRef, offset }: ScrollTopProps) => {
  const [canGoUp, setCanGoUp] = useState(false);

  const handleGoUpVisibility = useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement;
      setCanGoUp(target?.scrollTop > offset);
    },
    [offset],
  );

  useEffect(() => {
    if (containerRef !== null && typeof containerRef !== "function") {
      const element = containerRef.current;
      if (element) {
        element.addEventListener("scroll", handleGoUpVisibility);
      }
      return () => {
        element?.removeEventListener("scroll", handleGoUpVisibility);
      };
    }
  }, [handleGoUpVisibility, containerRef]);

  const scrollToTop = useCallback(() => {
    if (containerRef !== null && typeof containerRef !== "function") {
      containerRef.current?.scrollTo({
        behavior: "smooth",
        top: 0,
      });
    }
  }, [containerRef]);

  return { canGoUp, scrollToTop };
};
