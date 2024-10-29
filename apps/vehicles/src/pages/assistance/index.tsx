import AppLayout from "@/components/layouts/AppLayout";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";

export default function Assistance() {
  return <Stack>{}</Stack>;
}

Assistance.getLayout = (page: ReactElement) => (
  <AppLayout description="assistance.description" title="assistance.title">
    {page}
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
