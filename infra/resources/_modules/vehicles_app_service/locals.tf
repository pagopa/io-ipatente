
locals {
  vehicles = {
    tier = "standard"
    base_app_settings = {
      TODO = "TODO:"
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