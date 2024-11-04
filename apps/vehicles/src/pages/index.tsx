import AppLayout from "@/components/layouts/AppLayout";
import { Veicolo } from "@/generated/bff-openapi";
import { useVehicles } from "@/hooks/useVehicles";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReactElement } from "react";

export default function Home() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session } = useSession();

  const { data = [], error, isError, isLoading } = useVehicles();

  const testChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const path = router.asPath;
    const locale = event.target.value;
    return router.push(path, path, { locale });
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta content={t("app.description")} name="description" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <Grid
        alignContent="center"
        alignItems="center"
        container
        spacing={2}
        textAlign="center"
      >
        <Grid item xs={12}>
          <Typography color="primary" variant="h3">
            {t("welcome")} {session?.user?.givenName}{" "}
            {session?.user?.familyName}{" "}
          </Typography>
          <Typography variant="h5">{session?.user?.fiscalCode}</Typography>
        </Grid>
        {data.map((vehicle: Veicolo) => (
          <Grid item key={vehicle.targaVeicolo} xs={12}>
            <Typography
              fontWeight={600}
            >{`Dati veicolo ${vehicle.targaVeicolo}`}</Typography>
            <Typography>{JSON.stringify(vehicle)}</Typography>
          </Grid>
        ))}
        <Grid item xs={12}>
          <select id="i18nSelect" onChange={testChangeLanguage}>
            <option value="it">IT</option>
            <option value="en">EN</option>
          </select>
        </Grid>
      </Grid>
    </>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout title="app.title">{page}</AppLayout>;
};

// Loading locales server-side
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, ["common"])),
  },
});
