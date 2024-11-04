import AppLayout from "@/components/layouts/AppLayout";
import { GenericError } from "@/components/shared/GenericError";
import { VehicleSectionDetails } from "@/components/vehicle-details/VehicleSectionDetails";
import { VehicleSectionInspections } from "@/components/vehicle-details/VehicleSectionInspections";
import { VehicleSectionRca } from "@/components/vehicle-details/VehicleSectionRca";
import { useVehicles } from "@/hooks/useVehicles";
import { vehicleByType } from "@/utils/strings";
import { SectionTitle } from "@io-ipatente/ui";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { GetLayoutProps } from "../_app";

export default function VehicleDetails() {
  const router = useRouter();
  const licensePlate = router.query.licensePlate;

  // TODO: wrap the select function in useCallback
  const { data, error, isError, isLoading, isRefetching, refetch } =
    useVehicles((data) =>
      data.find((vehicle) => vehicle.targaVeicolo === licensePlate),
    );

  if (isLoading || isRefetching) {
    return <Stack my={3}>Loading...</Stack>;
  }

  if (!data || isError) {
    return <GenericError error={error} onRetry={refetch} />;
  }

  const { icon } = vehicleByType[data.tipoVeicolo] ?? {
    icon: "car1",
    label: "vehicles.defaultLabel",
  };

  return (
    <>
      <SectionTitle icon={icon} label={data.targaVeicolo} />
      <Stack my={3} spacing={2}>
        <VehicleSectionDetails data={data} />
        <VehicleSectionRca rca={data.coperturaRCA} />
        <VehicleSectionInspections inspections={data.storicoRevisioni} />
      </Stack>
    </>
  );
}

VehicleDetails.getLayout = ({ page, router, t }: GetLayoutProps) => (
  <AppLayout
    title={t("vehicleDetails.title")}
    topElement={{
      breadcrumbs: [
        {
          label: t("vehicleDetails.breadcrumbs.vehicles"),
          routePath: "/vehicles",
        },
        { label: t("vehicleDetails.breadcrumbs.vehicleDetail") },
      ],
      onBreadcrumbClick: (path) => router.push(path),
    }}
  >
    {page}
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
