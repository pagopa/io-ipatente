import AppLayout from "@/components/layouts/AppLayout";
import { LicenceSectionDetails } from "@/components/licence-details/LicenceSectionDetails";
import { GenericError } from "@/components/shared/GenericError";
import { Patenti } from "@/generated/bff-openapi";
import { useLicences } from "@/hooks/useLicences";
import {
  CardInfo,
  Icon,
  SectionTitle,
  Table,
  TableProps,
} from "@io-ipatente/ui";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useMemo } from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { GetLayoutProps } from "../_app";

export default function LicenceDetails() {
  const router = useRouter();
  const { t } = useTranslation();

  const licenseNumber = router.query.licenseNumber;

  const selectLicenseByLicenseNumber = useCallback(
    (data: Patenti) =>
      [...data.datiPatente, ...(data.datiPatenteCqc || [])].find(
        (license) => license.numeroPatente === licenseNumber,
      ),
    [licenseNumber],
  );
  const { data, error, isError, isLoading, isRefetching, refetch } =
    useLicences(selectLicenseByLicenseNumber);

  // TODO: check this logic if openApi changes
  const rows = useMemo<TableProps["rows"]>(
    () =>
      (data?.movPat || [])?.map(
        ({
          dataAttribuzionePunteggio,
          descrizioneEventoPunteggio,
          punteggioNominativo,
        }) => ({
          date: dataAttribuzionePunteggio ?? "",
          detail: descrizioneEventoPunteggio ?? "",
          key: `${descrizioneEventoPunteggio}-${dataAttribuzionePunteggio}`,
          variation: punteggioNominativo || 0,
        }),
      ),
    [data],
  );

  const columns = useMemo(
    () => [
      t("licenceDetails.history.columns.detail"),
      t("licenceDetails.history.columns.variation"),
    ],
    [t],
  );

  if (isLoading || isRefetching) {
    return <Stack my={3}>Loading...</Stack>;
  }

  if (!data || isError) {
    return <GenericError error={error} onRetry={refetch} />;
  }

  return (
    <>
      <SectionTitle icon="driveLicense" label={data.numeroPatente} />
      <Stack my={3} spacing={2}>
        <LicenceSectionDetails data={data} />
        <CardInfo
          bottomContent={<Table columns={columns} rows={rows} />}
          icon={<Icon fontSize="medium" name="documentText" />}
          title={t("licenceDetails.history.title")}
        />
        {/** TODO: Storico punti */}
      </Stack>
    </>
  );
}

LicenceDetails.getLayout = ({ page, router, t }: GetLayoutProps) => (
  <AppLayout
    breadcrumbsProps={{
      breadcrumbs: [
        {
          label: t("licenceDetails.breadcrumbs.licences"),
          routePath: "/licences",
        },
        { label: t("licenceDetails.breadcrumbs.licenceDetail") },
      ],
      onBreadcrumbClick: (path) => router.push(path),
    }}
    enableScrollToTop
    title={t("licenceDetails.title")}
  >
    {page}
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
