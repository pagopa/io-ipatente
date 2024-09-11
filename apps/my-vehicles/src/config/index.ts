export interface Configuration {
  // Backend for Frontend
  BACKEND_API_BASE_PATH: string;
  BACKEND_API_BASE_URL: string;
  BACKEND_API_MOCKING: boolean;

  IS_BROWSER: boolean;
  IS_DEVELOPMENT: boolean;
  IS_MSW_ENABLED: boolean; // Mock Service Worker - API mocking library for browser and Node.js
  IS_PRODUCTION: boolean;
  IS_SERVER: boolean;
  IS_TEST: boolean;

  // FIMS OIDC
  OIDC_API_MOCKING: boolean;
  OIDC_CLIENT_ID: string;
  OIDC_CLIENT_REDIRECT_URI: string;
  OIDC_CLIENT_SECRET: string;
  OIDC_ISSUER_URL: string;
  OIDC_MOCK_JWT_PRIVATE_KEY?: string;
  OIDC_MOCK_JWT_PUBLIC_KEY?: string;
}

export function getConfiguration(): Configuration {
  return {
    BACKEND_API_BASE_PATH: process.env
      .NEXT_PUBLIC_BACKEND_API_BASE_PATH as string,
    BACKEND_API_BASE_URL: process.env
      .NEXT_PUBLIC_BACKEND_API_BASE_URL as string,
    BACKEND_API_MOCKING: process.env.NEXT_PUBLIC_BACKEND_API_MOCKING === "true",

    IS_BROWSER: typeof window !== "undefined",
    IS_DEVELOPMENT: process.env.NODE_ENV === "development",
    IS_MSW_ENABLED: process.env.NEXT_PUBLIC_IS_MSW_ENABLED === "true",
    IS_PRODUCTION: process.env.NODE_ENV === "production",
    IS_SERVER: typeof window === "undefined",
    IS_TEST: process.env.NODE_ENV === "test",

    OIDC_API_MOCKING: process.env.OIDC_API_MOCKING === "true",
    OIDC_CLIENT_ID: process.env.OIDC_CLIENT_ID as string,
    OIDC_CLIENT_REDIRECT_URI: process.env.OIDC_CLIENT_REDIRECT_URI as string,
    OIDC_CLIENT_SECRET: process.env.OIDC_CLIENT_SECRET as string,
    OIDC_ISSUER_URL: process.env.OIDC_ISSUER_URL as string,
    OIDC_MOCK_JWT_PRIVATE_KEY: process.env.OIDC_MOCK_JWT_PRIVATE_KEY as string,
    OIDC_MOCK_JWT_PUBLIC_KEY: process.env.OIDC_MOCK_JWT_PUBLIC_KEY as string,
  };
}
