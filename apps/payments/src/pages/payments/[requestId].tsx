import AppLayout from "@/components/layouts/AppLayout";
import IUVListDetails from "@/components/payment-details/IUVListDetails";
import { PaymentSectionDetails } from "@/components/payment-details/PaymentSectionDetails";
import { GenericError } from "@/components/shared/GenericError";
import { Pagamento } from "@/generated/bff-openapi";
import { usePayments } from "@/hooks/usePayments";
import { CardInfo, SectionTitle } from "@io-ipatente/ui";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback } from "react";

import { GetLayoutProps } from "../_app";

export default function PaymentDetails() {
  const router = useRouter();
  const requestId = router.query.requestId;

  const selectPaymentByRequestId = useCallback(
    (data: Pagamento[]) =>
      data.find((payment) => payment.idRichiesta.toString() === requestId),
    [requestId],
  );

  const { data, error, isError, isLoading, isRefetching, refetch } =
    usePayments(selectPaymentByRequestId);

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
      <Stack my={3} spacing={2}>
        <PaymentSectionDetails data={data} />
        <IUVListDetails iuvList={data.listaIuv} />
      </Stack>
    </>
  );
}

PaymentDetails.getLayout = ({ page, router, t }: GetLayoutProps) => (
  <AppLayout
    breadcrumbsProps={{
      breadcrumbs: [
        {
          label: t("paymentDetails.breadcrumbs.payments"),
          routePath: "/payments",
        },
        { label: t("paymentDetails.breadcrumbs.paymentDetail") },
      ],
      onBreadcrumbClick: (path) => router.push(path),
    }}
    enableScrollToTop
    title={t("paymentDetails.title")}
  >
    {page}
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
