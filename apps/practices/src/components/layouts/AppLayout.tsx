import {
  PageHeader,
  PageHeaderProps,
  ScrollToTopButton,
} from "@io-ipatente/ui";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ReactNode, useRef } from "react";

// Dynamic import to avoid the warning relative to the classes mismatch between csr and ssr
const TopBar = dynamic(
  () => import("@io-ipatente/ui").then((mod) => mod.TopBar),
  { ssr: false },
);

type AppLayoutProps = {
  children: ReactNode;
  enableScrollToTop?: boolean;
} & PageHeaderProps;

const AppLayout = ({
  children,
  enableScrollToTop,
  ...rest
}: AppLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      ref={containerRef}
    >
      <TopBar
        assistance={{
          label: t("topBar.assistance"),
          onClick: () => router.push("/assistance"),
        }}
      />
      <PageHeader {...rest} />
      <Box sx={{ p: 2 }}>{children}</Box>
      {enableScrollToTop && (
        <ScrollToTopButton container={containerRef.current} />
      )}
    </Box>
  );
};

export default AppLayout;
