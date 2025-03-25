import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="it">
    <Head>
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-icon.png" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
