import { PageHeader, PageHeaderProps } from "@io-ipatente/ui";
import Box from "@mui/material/Box";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

// Dynamic import to avoid the warning relative to the classes mismatch between csr and ssr
const TopBar = dynamic(
  () => import("@io-ipatente/ui").then((mod) => mod.TopBar),
  { ssr: false },
);

const ScrollToTopButton = dynamic(
  () => import("@io-ipatente/ui").then((mod) => mod.ScrollToTopButton),
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

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      id="back-to-top-anchor"
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
        <ScrollToTopButton selector="#back-to-top-anchor" />
      )}
    </Box>
  );
};

export default AppLayout;
