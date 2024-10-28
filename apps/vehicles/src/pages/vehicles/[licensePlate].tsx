import AppLayout from "@/components/layouts/AppLayout";
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
import { ReactElement } from "react";

export default function VehicleDetails() {
  const router = useRouter();
  const licensePlate = router.query.licensePlate;

  // TODO: wrap the select function in useCallback
  const { data, error, isError, isLoading } = useVehicles((data) =>
    data.find((vehicle) => vehicle.targaVeicolo === licensePlate),
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (data === undefined) {
    return <div>Vehicle not found</div>;
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

VehicleDetails.getLayout = (page: ReactElement) => (
  <AppLayout title="vehicleDetails.title">{page}</AppLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
