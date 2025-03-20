import AppLayout from "@/components/layouts/AppLayout";
import { ListItemLicence } from "@/components/licences/ListItemLicence";
import { GenericError } from "@/components/shared/GenericError";
import { fetchLicences, useLicences } from "@/hooks/useLicences";
import { EmptyState, ListItemAction } from "@io-ipatente/ui";
import Stack from "@mui/material/Stack";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback } from "react";

import { GetLayoutProps } from "../_app";

export default function Licences() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data, error, isError, isLoading, isRefetching, refetch } =
    useLicences();

  const handleClick = useCallback(
    (licenseNumber: string) =>
      router.push(`/licences/${licenseNumber}`, undefined, { shallow: true }),
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

  if (data?.datiPatente.length === 0) {
    return (
      <Stack marginTop={3}>
        <EmptyState icon="driveLicense" title={t("licences.empty")} />
      </Stack>
    );
  }

  return (
    <Stack
      component="ul"
      spacing={2}
      sx={{ listStyleType: "none", m: 0, pl: 0 }}
    >
      {data?.datiPatente.map((item) => (
        <ListItemLicence
          data={item}
          key={`licence-${item.numeroPatente}`}
          label={t("licences.driverLicense")}
          onClick={handleClick}
        />
      ))}
      {data?.datiPatenteCqc?.map((item) => (
        <ListItemLicence
          data={item}
          key={`licence-${item.numeroPatente}`}
          label={t("licences.cqcLicense", {
            cqcType: item.tipoCqc?.descrizione,
          })}
          onClick={handleClick}
        />
      ))}
    </Stack>
  );
}

Licences.getLayout = ({ page, t }: GetLayoutProps) => (
  <AppLayout
    description={t("licences.description")}
    title={t("licences.title")}
  >
    {page}
  </AppLayout>
);

export const getServerSideProps = (async ({ locale }) => {
  const queryClient = new QueryClient();

  try {
    const { datiPatente = [], datiPatenteCqc = [] } =
      await queryClient.fetchQuery({
        queryFn: () => fetchLicences(),
        queryKey: ["licences"],
      });

    const totalLicences = datiPatente.length + datiPatenteCqc.length;
    // Redirect to the licence page if there is only one licence
    if (totalLicences === 1) {
      return {
        redirect: {
          destination: `/licences/${
            datiPatente.length === 1
              ? datiPatente[0].numeroPatente
              : datiPatenteCqc[0].numeroPatente
          }`,
          permanent: false,
        },
      };
    }

    return {
      props: {
        ...(await serverSideTranslations(locale as string, ["common"])),
        dehydratedState: dehydrate(queryClient),
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}) satisfies GetServerSideProps;
