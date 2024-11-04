import { PageHeader, PageHeaderProps, TopBar } from "@io-ipatente/ui";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

type AppLayoutProps = {
  children: ReactNode;
} & PageHeaderProps;

const AppLayout = ({ children, ...rest }: AppLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
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
    </Box>
  );
};

export default AppLayout;
