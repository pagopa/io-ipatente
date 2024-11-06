
locals {
  vehicles = {
    tier = "standard"
    base_app_settings = {
      NODE_ENV                 = "production"
      WEBSITE_RUN_FROM_PACKAGE = "1"

      AUTH_SECRET = "TODO: GET FROM KV"

      OIDC_ISSUER_URL          = "TODO: "
      OIDC_CLIENT_ID           = "TODO: "
      OIDC_CLIENT_SECRET       = "TODO: "
      OIDC_CLIENT_REDIRECT_URI = "TODO: "

      OIDC_MOCK_JWT_PRIVATE_KEY = "TODO: GET FROM KV"
      OIDC_MOCK_JWT_PUBLIC_KEY  = "TODO: GET FROM KV"

      NEXT_PUBLIC_IS_MSW_ENABLED  = false
      NEXT_PUBLIC_BFF_API_MOCKING = false

      NEXT_PUBLIC_BFF_API_BASE_URL  = "TODO: TO BE SET AFTER APP GATEWAY AND NS CONFIG"
      NEXT_PUBLIC_BFF_API_BASE_PATH = "/api"

      EXT_API_MOCKING   = false
      EXT_API_BASE_URL  = "TODO:"
      EXT_API_BASE_PATH = "/api"

      INTEROP_AUTH_SERVER_ENDPOINT_URL = "https://auth.uat.interop.pagopa.it/token.oauth2"
      INTEROP_CLIENT_ID                = "TODO: GET FROM KV"
      INTEROP_CLIENT_ASSERTION_TYPE    = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"
      INTEROP_GRANT_TYPE               = "client_credentials"

      INTEROP_CLIENT_ASSERTION_KID        = "TODO: GET FROM KV"
      INTEROP_CLIENT_ASSERTION_ISS        = "TODO: GET FROM KV"
      INTEROP_CLIENT_ASSERTION_SUB        = "TODO: GET FROM KV"
      INTEROP_CLIENT_ASSERTION_AUD        = "auth.uat.interop.pagopa.it / client-assertion"
      INTEROP_CLIENT_ASSERTION_PURPOSE_ID = "TODO: GET FROM KV"
      INTEROP_CLIENT_ASSERTION_PK         = "TODO: GET FROM KV"

      # Logs
      AI_SDK_CONNECTION_STRING = var.ai_connection_string
    }

    prod_app_setting = {
      APP_ENV = "production"
    }

    staging_app_setting = {
      APP_ENV = "staging"
    }

    sticky_settings = [
      "APP_ENV"
    ]

    autoscale_settings = {
      min     = 3
      max     = 30
      default = 3
    }
  }
}
