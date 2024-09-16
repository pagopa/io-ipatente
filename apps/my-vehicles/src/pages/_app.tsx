import type { AppProps } from "next/app";

import "@/styles/globals.css";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import { ReactElement, ReactNode } from "react";

if (process.env.NEXT_PUBLIC_BACKEND_API_MOCKING === "true") {
  require("../../mocks");
}

export type NextPageWithLayout<P = {}, IP = P> = {
  getLayout?: (page: ReactElement) => ReactNode;
} & NextPage<P, IP>;

type AppPropsWithLayout = {
  Component: NextPageWithLayout;
} & AppProps;

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider>{getLayout(<Component {...pageProps} />)}</SessionProvider>
  );
};

export default App;
