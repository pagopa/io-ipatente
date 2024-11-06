import { useScrollTop } from "@/hooks/useScrollTop";
import {
  FloatingButton,
  PageHeader,
  PageHeaderProps,
  TopBar,
} from "@io-ipatente/ui";
import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ReactNode, useRef } from "react";

type AppLayoutProps = {
  children: ReactNode;
  enableScrollTop?: boolean;
} & PageHeaderProps;

const AppLayout = ({ children, enableScrollTop, ...rest }: AppLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>();

  const { canGoUp, scrollToTop } = useScrollTop({ containerRef, offset: 100 });

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
      {enableScrollTop && canGoUp && (
        <Stack bottom={16} position="fixed" right={16} zIndex={2}>
          <FloatingButton
            color="secondary"
            icon="expandUp"
            onClick={scrollToTop}
          />
        </Stack>
      )}
    </Box>
  );
};

export default AppLayout;
