import { TopBar } from "@io-ipatente/ui";
import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const { t } = useTranslation();

  return (
    <>
      <TopBar
        product={{
          logo: "ipatente",
          name: t("topBar.product.name"),
          url: "",
        }}
      />
      <Box component="main" sx={{ p: 3 }}>
        {children}
      </Box>
    </>
  );
};

export default AppLayout;
