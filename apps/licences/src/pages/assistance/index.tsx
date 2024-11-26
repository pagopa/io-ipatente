import AppLayout from "@/components/layouts/AppLayout";
import { AssistanceInfo, AssistanceInfoProps } from "@io-ipatente/ui";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useMemo } from "react";

import { GetLayoutProps } from "../_app";

export default function Assistance() {
  const { t } = useTranslation();

  const itemsPropsArray = useMemo<AssistanceInfoProps["items"]>(
    () => [
      {
        contacts: [
          {
            description: t("assistance.phone.contact1.description"),
            href: `tel:${t("assistance.phone.contact1.value")}`,
            value: t("assistance.phone.contact1.value"),
          },
        ],
        icon: "callBold",
        title: t("assistance.phone.title"),
      },
    ],
    [t],
  );

  return (
    <Stack>
      <AssistanceInfo items={itemsPropsArray} />
    </Stack>
  );
}

Assistance.getLayout = ({ page, router, t }: GetLayoutProps) => (
  <AppLayout
    backButtonProps={{
      label: t("assistance.back"),
      onBackClick: () => router.back(),
    }}
    description={t("assistance.description")}
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
