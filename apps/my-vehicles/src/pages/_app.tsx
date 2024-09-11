import type { AppProps } from "next/app";

import { getConfiguration } from "@/config";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const handleSetupMocks = async () => {
    const { setupMocks } = await import("../../mocks");
    setupMocks();
  };

  useEffect(() => {
    if (getConfiguration().BACKEND_API_MOCKING) {
      handleSetupMocks();
    }
  }, []);

  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
