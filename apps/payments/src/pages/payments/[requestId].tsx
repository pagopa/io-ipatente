import AppLayout from "@/components/layouts/AppLayout";
import { IUVListDetails } from "@/components/payment-details/IUVListDetails";
import { PaymentSectionDetails } from "@/components/payment-details/PaymentSectionDetails";
import { GenericError } from "@/components/shared/GenericError";
import { Pagamento } from "@/generated/bff-openapi";
import { usePaymentReceipt } from "@/hooks/usePaymentReceipt";
import { usePayments } from "@/hooks/usePayments";
import { CardInfo, Icon, SectionTitle } from "@io-ipatente/ui";
import { Box, Button } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import { saveAs } from "file-saver";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback } from "react";

import { GetLayoutProps } from "../_app";

export default function PaymentDetails() {
  const router = useRouter();
  const requestId = router.query.requestId;
  const { t } = useTranslation();

  const selectPaymentByRequestId = useCallback(
    (data: Pagamento[]) =>
      data.find((payment) => payment.idRichiesta.toString() === requestId),
    [requestId],
  );

  const { data, error, isError, isLoading, isRefetching, refetch } =
    usePayments(selectPaymentByRequestId);

  const { refetch: refetchReceipt } = usePaymentReceipt(requestId as string);

  const downloadFile = useCallback(async () => {
    const { data: receipt, isError } = await refetchReceipt();
    if (!isError && receipt?.risultato) {
      const { ext, file, fileName } = receipt.risultato;

      const byteCharacters = atob(file);
      const byteNumbers = new Array(byteCharacters.length);

      new Array(byteCharacters.length).fill(null).forEach((_, i) => {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      });
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: `application/${ext}` });
      saveAs(blob, `${fileName}.${ext}`);
    }
  }, [refetchReceipt]);

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
        <Box width="max-content">
          <Button
            endIcon={<Icon name="download" />}
            onClick={downloadFile}
            size="small"
            variant="contained"
          >
            {t("paymentDetails.receipt.save")}
          </Button>
        </Box>

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
