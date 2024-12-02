import AppLayout from "@/components/layouts/AppLayout";
import { PracticeSectionDetails } from "@/components/practice-details/PracticeSectionDetails";
import { PracticeTypeDetails } from "@/components/practice-details/PracticeTypeDetails";
import { GenericError } from "@/components/shared/GenericError";
import { Pratica } from "@/generated/bff-openapi";
import { usePractices } from "@/hooks/usePractices";
import { CardInfo, SectionTitle } from "@io-ipatente/ui";
import { Typography } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback } from "react";

import { GetLayoutProps } from "../_app";

export default function PracticeDetails() {
  const router = useRouter();
  const practiceNumber = router.query.practiceNumber;

  const selectPracticeByNumber = useCallback(
    (data: Pratica[]) =>
      data.find((practice) => `${practice.numeroPratica}` === practiceNumber),
    [practiceNumber],
  );

  const { data, error, isError, isLoading, isRefetching, refetch } =
    usePractices(selectPracticeByNumber);

  if (isLoading || isRefetching) {
    return (
      <>
        <SectionTitle isLoading />
        <Stack my={3} spacing={2}>
          <CardInfo
            icon={<Skeleton height={24} variant="rounded" width={24} />}
            items={Array.from({ length: 3 }).map(() => ({
              label: <Skeleton height={24} width="25%" />,
              value: <Skeleton height={24} width="100%" />,
            }))}
          />
        </Stack>
      </>
    );
  }

  if (!data || isError) {
    return <GenericError error={error} onRetry={refetch} />;
  }

  return (
    <>
      <Typography variant="h5">{`${data.tipoPratica.descrizione}`}</Typography>
      <Stack my={3} spacing={2}>
        <PracticeSectionDetails data={data} />
        <PracticeTypeDetails tipoPratica={data.tipoPratica} />
      </Stack>
    </>
  );
}

PracticeDetails.getLayout = ({ page, router, t }: GetLayoutProps) => (
  <AppLayout
    breadcrumbsProps={{
      breadcrumbs: [
        {
          label: t("practiceDetails.breadcrumbs.practices"),
          routePath: "/practices",
        },
        { label: t("practiceDetails.breadcrumbs.practiceDetail") },
      ],
      onBreadcrumbClick: (path) => router.push(path),
    }}
    enableScrollToTop
    title={t("practiceDetails.title")}
  >
    {page}
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
