
locals {
  vehicles = {
    tier = "standard"
    base_app_settings = {
      NODE_ENV                 = "production"
      WEBSITE_RUN_FROM_PACKAGE = "1"

      # Logs
      AI_SDK_CONNECTION_STRING = data.azurerm_application_insights.ai_common.connection_string
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