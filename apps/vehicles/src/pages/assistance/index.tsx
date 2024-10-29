import AppLayout from "@/components/layouts/AppLayout";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GetLayoutProps } from "../_app";

export default function Assitance() {
  return null;
}

Assitance.getLayout = ({ page }: GetLayoutProps) => (
  <AppLayout description={""} title={""}>
    {page}
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
