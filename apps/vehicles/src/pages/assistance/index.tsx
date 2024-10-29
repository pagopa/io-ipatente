import AppLayout from "@/components/layouts/AppLayout";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GetLayoutProps } from "../_app";

export default function Assistance() {
  return <></>;
}

Assistance.getLayout = ({ page, router, t }: GetLayoutProps) => (
  <AppLayout
    breadcrumbs={[
      {
        clickable: true,
        icon: "arrowBack",
        label: t("assistance.back"),
        routePath: "/",
      },
    ]}
    description={t("assistance.description")}
    onBreadcrumbClick={() => router.back()}
    title={t("assistance.title")}
  >
    {page}
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
