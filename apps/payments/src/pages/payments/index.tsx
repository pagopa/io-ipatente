import AppLayout from "@/components/layouts/AppLayout";
import { ListItemPayment } from "@/components/payments/ListItemPayment";
import { GenericError } from "@/components/shared/GenericError";
import { usePayments } from "@/hooks/usePayments";
import { EmptyState, ListItemAction } from "@io-ipatente/ui";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback } from "react";

import { GetLayoutProps } from "../_app";

export default function Payments() {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    data = [],
    error,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = usePayments();

  const handleOnClick = useCallback(
    (requestId: string) => router.push(`/payments/${requestId}`),
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
        <EmptyState icon="wallet" title={t("payments.empty")} />
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
        <ListItemPayment
          data={item}
          key={`payment-${item.idRichiesta}`}
          onClick={handleOnClick}
        />
      ))}
    </Stack>
  );
}

Payments.getLayout = ({ page, t }: GetLayoutProps) => (
  <AppLayout title={t("payments.title")}>{page}</AppLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
