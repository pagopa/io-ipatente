/** @type {import('next').NextConfig} */
import path from "node:path";
import nextI18NextConfig from "./next-i18next.config.js";

const i18n = nextI18NextConfig.i18n;

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@pagopa/mui-italia"],
  i18n,
  // https://github.com/mswjs/msw/issues/1801
  // Setting `resolve.alias` to `false` will tell webpack to ignore a module.
  // `msw/node` is a server-only module that exports methods not available in the `browser`.
  // `msw/browser` is a client-only module that exports methods not available on the `server`.
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "msw/browser": false,
      };
    } else {
      config.resolve.alias = {
        ...config.resolve.alias,
        "msw/node": false,
        react: path.resolve("./node_modules/react"),
        "react-dom": path.resolve("./node_modules/react-dom"),
        "@emotion/react": path.resolve("./node_modules/@emotion/react"),
      };
    }
    return config;
  },
};

export default nextConfig;
