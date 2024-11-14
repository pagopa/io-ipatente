
locals {
  licences = {
    tier = "standard"
    base_app_settings = {
      NODE_ENV                 = "production"
      WEBSITE_RUN_FROM_PACKAGE = "1"

      AUTH_SECRET     = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=AUTH-SECRET)"
      AUTH_TRUST_HOST = true
      AUTH_URL        = "https://io-p-itn-ipatente-licences-app-01.azurewebsites.net/"

      OIDC_ISSUER_URL          = "https://io-p-itn-ipatente-licences-app-01.azurewebsites.net/api/auth/mocks/oidc"
      OIDC_CLIENT_ID           = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=OIDC-CLIENT-ID-LICENCES)"
      OIDC_CLIENT_SECRET       = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=OIDC-CLIENT-SECRET-LICENCES)"
      OIDC_CLIENT_REDIRECT_URI = "https://io-p-itn-ipatente-licences-app-01.azurewebsites.net/api/auth/callback/fims"

      OIDC_MOCK_JWT_PRIVATE_KEY = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=OIDC-JWT-PRIVATE-KEY)"
      OIDC_MOCK_JWT_PUBLIC_KEY  = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=OIDC-JWT-PUBLIC-KEY)"
      OIDC_MOCK_FORCED_ENABLE   = true

      NEXT_PUBLIC_IS_MSW_ENABLED  = true
      NEXT_PUBLIC_BFF_API_MOCKING = true

      NEXT_PUBLIC_BFF_API_BASE_URL  = "https://io-p-itn-ipatente-licences-app-01.azurewebsites.net"
      NEXT_PUBLIC_BFF_API_BASE_PATH = "/api"

      EXT_API_MOCKING   = true
      EXT_API_BASE_URL  = "http://example.com"
      EXT_API_BASE_PATH = "/api"

      INTEROP_AUTH_SERVER_ENDPOINT_URL = "https://auth.uat.interop.pagopa.it/token.oauth2"
      INTEROP_CLIENT_ID                = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ID-LICENCES)"
      INTEROP_CLIENT_ASSERTION_TYPE    = "urn:ietf:params:oauth:client-assertion-type:jwt-bearer"
      INTEROP_GRANT_TYPE               = "client_credentials"

      INTEROP_CLIENT_ASSERTION_KID        = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ASSERTION-KID-LICENCES)"
      INTEROP_CLIENT_ASSERTION_ISS        = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ASSERTION-ISS-LICENCES)"
      INTEROP_CLIENT_ASSERTION_SUB        = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ASSERTION-SUB-LICENCES)"
      INTEROP_CLIENT_ASSERTION_AUD        = "auth.uat.interop.pagopa.it / client-assertion"
      INTEROP_CLIENT_ASSERTION_PURPOSE_ID = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ASSERTION-PURPOSE-ID-LICENCES)"
      INTEROP_CLIENT_ASSERTION_PK         = "@Microsoft.KeyVault(VaultName=${var.key_vault_name};SecretName=INTEROP-CLIENT-ASSERTION-PK-LICENCES)"

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
