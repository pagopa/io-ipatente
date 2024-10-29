import { PageHeader, TopBar } from "@io-ipatente/ui";
import Box from "@mui/material/Box";
import { ParseKeys } from "i18next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  description?: ParseKeys;
  title: ParseKeys;
}

const AppLayout = ({ children, description, title }: AppLayoutProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <TopBar
        assistance={{
          label: "",
          onClick: () => {
            router.push("/assistance");
          },
        }}
        product={{
          logo: "ipatente",
          name: t("topBar.product.name"),
          url: "",
        }}
      />
      <PageHeader
        description={description ? t(description) : ""}
        title={t(title)}
      />
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
