import {
  PageHeader,
  PageHeaderBreadcrumbsProps,
  TopBar,
} from "@io-ipatente/ui";
import Box from "@mui/material/Box";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

interface AppLayoutProps extends Partial<PageHeaderBreadcrumbsProps> {
  children: ReactNode;
  description?: string;
  title: string;
}

const AppLayout = ({
  breadcrumbs,
  children,
  description,
  onBreadcrumbClick,
  title,
}: AppLayoutProps) => {
  const { t } = useTranslation();

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <TopBar
        product={{
          logo: "ipatente",
          name: t("topBar.product.name"),
          url: "",
        }}
      />
      <PageHeader
        breadcrumbs={breadcrumbs}
        description={description}
        onBreadcrumbClick={onBreadcrumbClick}
        title={title}
      />
      <Box sx={{ p: 2 }}>{children}</Box>
    </Box>
  );
};

export default AppLayout;
