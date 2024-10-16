import AppLayout from "@/components/layouts/AppLayout";
import { useVehicles } from "@/hooks/useVehicles";
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

  return <div>TODO: {JSON.stringify(data?.targaVeicolo)}</div>;
}

VehicleDetails.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout title="vehicleDetails.title">{page}</AppLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
