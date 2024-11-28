import AppLayout from "@/components/layouts/AppLayout";
import { ListItemPractice } from "@/components/practices/ListItemPractice";
import { GenericError } from "@/components/shared/GenericError";
import { usePractices } from "@/hooks/usePractices";
import { EmptyState, ListItemAction } from "@io-ipatente/ui";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback } from "react";

import { GetLayoutProps } from "../_app";

export default function Practices() {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    data = [],
    error,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = usePractices();

  const handleOnClick = useCallback(
    (practiceNumber: string) => router.push(`/practices/${practiceNumber}`),
    [router],
  );

  if (isLoading || isRefetching) {
    return (
      <Stack
        component="ul"
        spacing={2}
        sx={{ listStyleType: "none", m: 0, pl: 0 }}
      >
        <ListItemAction isLoading />
        <ListItemAction isLoading />
      </Stack>
    );
  }

  if (isError) {
    return <GenericError error={error} onRetry={refetch} />;
  }

  if (data.length === 0) {
    return (
      <Stack marginTop={3}>
        <EmptyState icon="folderCrossBold" title={t("practices.empty")} />
      </Stack>
    );
  }

  return (
    <Stack
      component="ul"
      spacing={2}
      sx={{ listStyleType: "none", m: 0, pl: 0 }}
    >
      {data.map((item) => (
        <ListItemPractice
          data={item}
          key={`practice-${item.numeroPratica}`}
          onClick={handleOnClick}
        />
      ))}
    </Stack>
  );
}

Practices.getLayout = ({ page, t }: GetLayoutProps) => (
  <AppLayout title={t("practices.title")}>{page}</AppLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
