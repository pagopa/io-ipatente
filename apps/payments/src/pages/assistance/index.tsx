import AppLayout from "@/components/layouts/AppLayout";
import {
  AssistanceInfo,
  AssistanceInfoProps,
  SectionTitle,
} from "@io-ipatente/ui";
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
            description: t("assistance.contacts.1.description"),
            href: `mailto:${t("assistance.contacts.1.value")}`,
            icon: "mailSendBold",
            title: t("assistance.contacts.1.title"),
            value: t("assistance.contacts.1.value"),
          },
        ],
      },
    ],
    [t],
  );

  return (
    <>
      <SectionTitle label={t("assistance.subTitle")} />
      <AssistanceInfo items={itemsPropsArray} />
    </>
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
