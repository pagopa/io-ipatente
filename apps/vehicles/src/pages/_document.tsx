import { Head, Html, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="it">
    <Head>
      <link href="/favicon.ico" rel="icon" sizes="32x32" />
      <link href="/icon.svg" rel="icon" type="image/svg+xml" />
      <link href="/apple-icon.png" rel="apple-touch-icon" />
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
