import AppLayout from "@/components/layouts/AppLayout";
import { ListItemVehicle } from "@/components/vehicles/ListItemVehicle";
import { useVehicles } from "@/hooks/useVehicles";
import { EmptyState, ListItemAction } from "@io-ipatente/ui";
import Stack from "@mui/material/Stack";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";

import { GetLayoutProps } from "../_app";

export default function Vehicles() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data = [], error, isError, isLoading } = useVehicles();

  const handleOnClick = useCallback(
    (licensePlate: string) => router.push(`/vehicles/${licensePlate}`),
    [router],
  );

  if (isLoading) {
    return (
      <Stack
        component="ul"
        spacing={2}
        sx={{ listStyleType: "none", m: 0, pl: 0 }}
      >
        <ListItemAction isLoading />
        <ListItemAction isLoading />
        <ListItemAction isLoading />
      </Stack>
    );
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return data.length ? (
    <Stack
      component="ul"
      spacing={2}
      sx={{ listStyleType: "none", m: 0, pl: 0 }}
    >
      {data.map((item) => (
        <ListItemVehicle
          data={item}
          key={`vehicle-${item.targaVeicolo}`}
          onClick={handleOnClick}
        />
      ))}
    </Stack>
  ) : (
    <Stack marginTop={3}>
      <EmptyState icon="car1Bold" title={t("vehicles.empty")} />
    </Stack>
  );
}

Vehicles.getLayout = ({ page, t }: GetLayoutProps) => (
  <AppLayout
    description={t("vehicles.description")}
    title={t("vehicles.title")}
  >
    {page}
  </AppLayout>
);

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
