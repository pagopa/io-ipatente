import AppLayout from "@/components/layouts/AppLayout";
import { AssistanceInfo } from "@io-ipatente/ui";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GetLayoutProps } from "../_app";

export default function Assistance() {
  const { t } = useTranslation();
  return (
    <Stack>
      <AssistanceInfo
        description={t("assistance.info.description")}
        phone={t("assistance.info.phone")}
        title={t("assistance.info.title")}
      />
    </Stack>
  );
}

Assistance.getLayout = ({ page, router, t }: GetLayoutProps) => (
  <AppLayout
    backLabel={t("assistance.back")}
    description={t("assistance.description")}
    onBackClick={() => router.back()}
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
