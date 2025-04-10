export interface Configuration {
  APP_URL: string;

  // Backend for Frontend
  BFF_API_BASE_PATH: string;
  BFF_API_BASE_URL: string;
  BFF_API_MOCKING: boolean;

  DEV_MODE: boolean;

  // External DG MOT backend
  EXT_API_BASE_PATH: string;
  EXT_API_BASE_URL: string;
  EXT_API_MOCKING: boolean;

  // Fetch keepalive
  FETCH_KEEPALIVE_MAX_FREE_SOCKETS: number | undefined;
  FETCH_KEEPALIVE_MAX_SOCKETS: number | undefined;
  FETCH_KEEPALIVE_TIMEOUT: number | undefined;

  // FIMS Privacy Policy URL
  FIMS_PRIVACY_URL: string;

  // INTERNAL TEST API
  INTERNAL_ROUTES_ENABLED: boolean;
  INTERNAL_ROUTES_TEST_USER: string[];
  // PDND Interoperability
  INTEROP_API_MOCKING: boolean;
  INTEROP_AUTH_SERVER_ENDPOINT_URL: string;
  INTEROP_CLIENT_ASSERTION_AUD: string;
  INTEROP_CLIENT_ASSERTION_ISS: string;
  INTEROP_CLIENT_ASSERTION_KID: string;
  INTEROP_CLIENT_ASSERTION_PK: string;
  INTEROP_CLIENT_ASSERTION_PURPOSE_ID: string;
  INTEROP_CLIENT_ASSERTION_SUB: string;

  INTEROP_CLIENT_ASSERTION_TYPE: string;
  INTEROP_CLIENT_ID: string;
  INTEROP_ESERVICE_AUDIENCE: string;
  INTEROP_GRANT_TYPE: string;
  IS_BROWSER: boolean;
  IS_DEVELOPMENT: boolean;

  IS_MSW_ENABLED: boolean; // Mock Service Worker - API mocking library for browser and Node.js
  IS_PRODUCTION: boolean;
  IS_SERVER: boolean;
  IS_TEST: boolean;
  // FIMS OIDC
  OIDC_CLIENT_ID: string;
  OIDC_CLIENT_REDIRECT_URI: string;
  OIDC_CLIENT_SECRET: string;

  OIDC_ISSUER_URL: string;
  OIDC_MOCK_FORCED_ENABLE?: boolean;

  OIDC_MOCK_JWT_PRIVATE_KEY?: string;
  OIDC_MOCK_JWT_PUBLIC_KEY?: string;
}

export const getConfiguration = (): Configuration => ({
  APP_URL: process.env.NEXT_PUBLIC_APP_URL as string,

  BFF_API_BASE_PATH: process.env.NEXT_PUBLIC_BFF_API_BASE_PATH as string,
  BFF_API_BASE_URL: process.env.NEXT_PUBLIC_BFF_API_BASE_URL as string,
  BFF_API_MOCKING: process.env.NEXT_PUBLIC_BFF_API_MOCKING === "true",

  DEV_MODE: process.env.DEV_MODE === "true",

  EXT_API_BASE_PATH: process.env.EXT_API_BASE_PATH as string,
  EXT_API_BASE_URL: process.env.EXT_API_BASE_URL as string,
  EXT_API_MOCKING: process.env.EXT_API_MOCKING === "true",

  FETCH_KEEPALIVE_MAX_FREE_SOCKETS:
    process.env.FETCH_KEEPALIVE_MAX_FREE_SOCKETS === undefined
      ? undefined
      : parseInt(process.env.FETCH_KEEPALIVE_MAX_FREE_SOCKETS, 10),
  FETCH_KEEPALIVE_MAX_SOCKETS:
    process.env.FETCH_KEEPALIVE_MAX_SOCKETS === undefined
      ? undefined
      : parseInt(process.env.FETCH_KEEPALIVE_MAX_SOCKETS, 10),
  FETCH_KEEPALIVE_TIMEOUT:
    process.env.FETCH_KEEPALIVE_TIMEOUT === undefined
      ? undefined
      : parseInt(process.env.FETCH_KEEPALIVE_TIMEOUT, 10),

  FIMS_PRIVACY_URL: process.env.NEXT_PUBLIC_FIMS_PRIVACY_URL as string,

  INTERNAL_ROUTES_ENABLED: process.env.INTERNAL_ROUTES_ENABLED === "true",
  INTERNAL_ROUTES_TEST_USER: process.env.INTERNAL_ROUTES_TEST_USER
    ? process.env.INTERNAL_ROUTES_TEST_USER.split(",").map((user) =>
        user.trim(),
      )
    : [],

  INTEROP_API_MOCKING: process.env.INTEROP_API_MOCKING === "true",
  INTEROP_AUTH_SERVER_ENDPOINT_URL: process.env
    .INTEROP_AUTH_SERVER_ENDPOINT_URL as string,
  INTEROP_CLIENT_ASSERTION_AUD: process.env
    .INTEROP_CLIENT_ASSERTION_AUD as string,
  INTEROP_CLIENT_ASSERTION_ISS: process.env
    .INTEROP_CLIENT_ASSERTION_ISS as string,
  INTEROP_CLIENT_ASSERTION_KID: process.env
    .INTEROP_CLIENT_ASSERTION_KID as string,
  INTEROP_CLIENT_ASSERTION_PK: process.env
    .INTEROP_CLIENT_ASSERTION_PK as string,
  INTEROP_CLIENT_ASSERTION_PURPOSE_ID: process.env
    .INTEROP_CLIENT_ASSERTION_PURPOSE_ID as string,
  INTEROP_CLIENT_ASSERTION_SUB: process.env
    .INTEROP_CLIENT_ASSERTION_SUB as string,
  INTEROP_CLIENT_ASSERTION_TYPE: process.env
    .INTEROP_CLIENT_ASSERTION_TYPE as string,
  INTEROP_CLIENT_ID: process.env.INTEROP_CLIENT_ID as string,
  INTEROP_ESERVICE_AUDIENCE: process.env.INTEROP_ESERVICE_AUDIENCE as string,
  INTEROP_GRANT_TYPE: process.env.INTEROP_GRANT_TYPE as string,

  IS_BROWSER: typeof window !== "undefined",
  IS_DEVELOPMENT: process.env.NODE_ENV === "development",
  IS_MSW_ENABLED: process.env.NEXT_PUBLIC_IS_MSW_ENABLED === "true",
  IS_PRODUCTION: process.env.NODE_ENV === "production",
  IS_SERVER: typeof window === "undefined",
  IS_TEST: process.env.NODE_ENV === "test",

  OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID as string,
  OIDC_CLIENT_REDIRECT_URI: process.env.OIDC_CLIENT_REDIRECT_URI as string,
  OIDC_CLIENT_SECRET: process.env.OIDC_CLIENT_SECRET as string,
  OIDC_ISSUER_URL: process.env.OIDC_ISSUER_URL as string,
  OIDC_MOCK_FORCED_ENABLE: process.env.OIDC_MOCK_FORCED_ENABLE === "true",
  OIDC_MOCK_JWT_PRIVATE_KEY: process.env.OIDC_MOCK_JWT_PRIVATE_KEY as string,
  OIDC_MOCK_JWT_PUBLIC_KEY: process.env.OIDC_MOCK_JWT_PUBLIC_KEY as string,
});
