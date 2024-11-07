import { PageHeader, PageHeaderProps, TopBar } from "@io-ipatente/ui";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ReactNode, useRef } from "react";

import { ScrollToTopButton } from "../shared/ScrollToTopButton";

type AppLayoutProps = {
  children: ReactNode;
  enableScrollTop?: boolean;
} & PageHeaderProps;

const AppLayout = ({ children, enableScrollTop, ...rest }: AppLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>();

  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      overflow="scroll"
      ref={containerRef}
    >
      <TopBar
        assistance={{
          label: t("topBar.assistance"),
          onClick: () => router.push("/assistance"),
        }}
        product={{
          logo: "ipatente",
          name: t("topBar.product.name"),
          url: "",
        }}
      />
      <PageHeader {...rest} />
      <Box sx={{ p: 2 }}>{children}</Box>
      {enableScrollTop && <ScrollToTopButton ref={containerRef} />}
    </Box>
  );
};

export default AppLayout;
