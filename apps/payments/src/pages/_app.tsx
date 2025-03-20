import type { AppProps } from "next/app";

import { DialogProvider, theme } from "@io-ipatente/ui";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextPage } from "next";
import { Router } from "next/router";
import { SessionProvider } from "next-auth/react";
import { TFunction, appWithTranslation, useTranslation } from "next-i18next";
import { ReactElement, ReactNode, useState } from "react";

if (process.env.NEXT_PUBLIC_BFF_API_MOCKING === "true") {
  require("../../mocks");
}

export interface GetLayoutProps {
  page: ReactElement;
  router: Router;
  t: TFunction;
}

export type NextPageWithLayout<P = Record<string, never>, IP = P> = {
  getLayout?: ({ page, router, t }: GetLayoutProps) => ReactNode;
} & NextPage<P, IP>;

type AppPropsWithLayout = {
  Component: NextPageWithLayout;
} & AppProps;

const FETCH_MAX_RETRIES = 3;

const App = ({ Component, pageProps, router }: AppPropsWithLayout) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: FETCH_MAX_RETRIES,
            staleTime: 3 * 60 * 1000, // 3 minutes
          },
        },
      }),
  );

  const { t } = useTranslation();

  const getLayout = Component.getLayout ?? (({ page }) => page);

  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <DialogProvider>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            {getLayout({ page: <Component {...pageProps} />, router, t })}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </DialogProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(App);
