import AppLayout from "@/components/layouts/AppLayout";
import { LicenceMovementDetail } from "@/components/licence-details/LicenceMovementDetail";
import { LicenceSectionDetails } from "@/components/licence-details/LicenceSectionDetails";
import { GenericError } from "@/components/shared/GenericError";
import { MovPat, Patenti } from "@/generated/bff-openapi";
import { useLicences } from "@/hooks/useLicences";
import {
  CardInfo,
  Column,
  Icon,
  SectionTitle,
  Table,
  useDialog,
} from "@io-ipatente/ui";
import { Chip, Link, Typography } from "@mui/material";
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
  const { showDialog } = useDialog();

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

  const rows = useMemo(() => data?.movPat || [], [data]);

  const onDetailClicked = useCallback(
    (movDetail: MovPat) => {
      showDialog({
        body: <LicenceMovementDetail data={movDetail} />,
        title: t("licenceDetails.history.detail.title", {
          date: movDetail.dataEmissioneVerbale
            ? new Date(
                movDetail.dataEmissioneVerbale || "",
              ).toLocaleDateString()
            : "",
          description: movDetail.descrizioneEventoPunteggio,
        }),
      });
    },
    [showDialog, t],
  );

  const columns: Column<MovPat>[] = useMemo(
    () => [
      {
        key: "dataAttribuzionePunteggio",
        render: (_, item) => (
          <>
            <Typography
              color="text.secondary"
              fontWeight="regular"
              textAlign="initial"
              variant="body1"
            >
              {new Date(item.dataAttribuzionePunteggio).toLocaleDateString()}
            </Typography>
            {item.codiceVerbale ? (
              <Link
                color="text.primary"
                component="button"
                onClick={() => onDetailClicked?.(item)}
                sx={{
                  textDecoration: "underline",
                }}
              >
                {item.descrizioneEventoPunteggio}
              </Link>
            ) : (
              <Typography
                color="text.secondary"
                fontWeight="medium"
                textAlign="initial"
                variant="body1"
              >
                {item.descrizioneEventoPunteggio}
              </Typography>
            )}
          </>
        ),
        title: t("licenceDetails.history.columns.detail"),
        widthFactor: 0.8,
      },
      {
        key: "dataAttribuzionePunteggio",
        render: (_, item) => (
          <Stack alignItems="end" width="100%">
            <Chip
              color={(item.punteggioNominativo || 0) < 0 ? "error" : "info"}
              label={item.punteggioNominativo || 0}
              sx={{ borderRadius: 1, justifySelf: "end", paddingInline: 1 }}
            />
          </Stack>
        ),

        title: t("licenceDetails.history.columns.variation"),
      },
    ],
    [onDetailClicked, t],
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
