import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { Theme } from "@io-ipatente/ui";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { ReactElement, ReactNode, useState } from "react";

if (process.env.NEXT_PUBLIC_BACKEND_API_MOCKING === "true") {
  require("../../mocks");
}

export type NextPageWithLayout<P = Record<never, never>, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode;
} & NextPage<P, IP>;

type AppPropsWithLayout = {
  Component: NextPageWithLayout;
} & AppProps;

const FETCH_MAX_RETRIES = 5;

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: FETCH_MAX_RETRIES,
          },
        },
      }),
  );

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default appWithTranslation(App);
