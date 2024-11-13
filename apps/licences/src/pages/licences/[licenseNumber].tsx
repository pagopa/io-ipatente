import AppLayout from "@/components/layouts/AppLayout";
import { LicenceSectionDetails } from "@/components/licence-details/LicenceSectionDetails";
import { GenericError } from "@/components/shared/GenericError";
import { DatiPatente } from "@/generated/bff-openapi";
import { useLicences } from "@/hooks/useLicences";
import { SectionTitle, Table, TableProps } from "@io-ipatente/ui";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useMemo } from "react";

import { GetLayoutProps } from "../_app";

export default function LicenceDetails() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const licenseNumber = router.query.licenseNumber;

  // TODO: wrap the select function in useCallback
  const { data, error, isError, isLoading, isRefetching, refetch } =
    useLicences();

  const rows = useMemo<TableProps["rows"]>(
    () =>
      (data?.datiPatente ?? []).flatMap(({ movPat }) =>
        (movPat ?? [])?.map(
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
      ),
    [data?.datiPatente],
  );

  if (isLoading || isRefetching) {
    return <Stack my={3}>Loading...</Stack>;
  }

  if (!data || isError) {
    return <GenericError error={error} onRetry={refetch} />;
  }

  return (
    <>
      <SectionTitle
        icon="driving"
        label={data.datiPatente[0].numeroPatente ?? ""}
      />
      <Stack my={3} spacing={2}>
        <LicenceSectionDetails data={data.datiPatente as DatiPatente} />
        <Table columns={["Dettaglio", "Variazione Punti"]} rows={rows} />
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
