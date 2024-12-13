
locals {
  payments = {
    tier = "standard"
    base_app_settings = {
      NODE_ENV                 = "production"
      WEBSITE_RUN_FROM_PACKAGE = "1"

      AUTH_SECRET     = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=AUTH-SECRET-PAYMENTS)"
      AUTH_TRUST_HOST = true
      AUTH_URL        = "https://payments.ipatente.io.pagopa.it/"

      OIDC_ISSUER_URL          = "https://payments.ipatente.io.pagopa.it/api/auth/mocks/oidc"
      OIDC_CLIENT_ID           = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=OIDC-CLIENT-ID-PAYMENTS)"
      OIDC_CLIENT_SECRET       = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=OIDC-CLIENT-SECRET-PAYMENTS)"
      OIDC_CLIENT_REDIRECT_URI = "https://payments.ipatente.io.pagopa.it/api/auth/callback/fims"

      OIDC_MOCK_JWT_PRIVATE_KEY = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=OIDC-JWT-PRIVATE-KEY)"
      OIDC_MOCK_JWT_PUBLIC_KEY  = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=OIDC-JWT-PUBLIC-KEY)"
      OIDC_MOCK_FORCED_ENABLE   = true

      NEXT_PUBLIC_IS_MSW_ENABLED  = true
      NEXT_PUBLIC_BFF_API_MOCKING = true

      NEXT_PUBLIC_BFF_API_BASE_URL  = "https://payments.ipatente.io.pagopa.it"
      NEXT_PUBLIC_BFF_API_BASE_PATH = "/api"

      EXT_API_MOCKING   = true
      EXT_API_BASE_URL  = "http://example.com"
      EXT_API_BASE_PATH = "/api"

      INTEROP_AUTH_SERVER_ENDPOINT_URL = "https://auth.uat.interop.pagopa.it/token.oauth2"
      INTEROP_CLIENT_ID                = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ID-PAYMENTS)"
      INTEROP_CLIENT_ASSERTION_TYPE    = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"
      INTEROP_GRANT_TYPE               = "client_credentials"

      INTEROP_CLIENT_ASSERTION_KID        = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ASSERTION-KID-PAYMENTS)"
      INTEROP_CLIENT_ASSERTION_ISS        = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ASSERTION-ISS-PAYMENTS)"
      INTEROP_CLIENT_ASSERTION_SUB        = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ASSERTION-SUB-PAYMENTS)"
      INTEROP_CLIENT_ASSERTION_AUD        = "auth.uat.interop.pagopa.it / client-assertion"
      INTEROP_CLIENT_ASSERTION_PURPOSE_ID = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ASSERTION-PURPOSE-ID-PAYMENTS)"
      INTEROP_CLIENT_ASSERTION_PK         = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ASSERTION-PK-PAYMENTS)"

      // Fetch keepalive
      FETCH_KEEPALIVE_ENABLED             = "true"
      FETCH_KEEPALIVE_SOCKET_ACTIVE_TTL   = "110000"
      FETCH_KEEPALIVE_MAX_SOCKETS         = "40"
      FETCH_KEEPALIVE_MAX_FREE_SOCKETS    = "10"
      FETCH_KEEPALIVE_FREE_SOCKET_TIMEOUT = "30000"
      FETCH_KEEPALIVE_TIMEOUT             = "60000"

      # Logs
      AI_SDK_CONNECTION_STRING = var.ai_connection_string

      # Internal API for test
      INTERNAL_ROUTES_ENABLED   = false
      INTERNAL_ROUTES_TEST_USER = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTERNAL-ROUTES-TEST-USER-PAYMENTS)"
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
