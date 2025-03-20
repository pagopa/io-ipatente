module "practices_app_service_autoscaler" {
  source  = "pagopa-dx/azure-app-service-plan-autoscaler/azurerm"
  version = "~> 0.0"

  resource_group_name = var.resource_group_name

  target_service = {
    app_service_name = module.practices.app_service.app_service.name
  }

  scheduler = {
    maximum = local.practices.autoscale_settings.max
    normal_load = {
      default = local.practices.autoscale_settings.default
      minimum = local.practices.autoscale_settings.min
    }
  }

  scale_metrics = {
    cpu = {
      cooldown_decrease         = 5,
      cooldown_increase         = 5,
      decrease_by               = 1,
      increase_by               = 2,
      lower_threshold           = 30,
      statistic_decrease        = "Average",
      statistic_increase        = "Average",
      time_aggregation_decrease = "Average",
      time_aggregation_increase = "Average",
      time_window_decrease      = 7,
      time_window_increase      = 5,
      upper_threshold           = 60
    }
    requests = {
      cooldown_decrease         = 5,
      cooldown_increase         = 1,
      decrease_by               = 1,
      increase_by               = 2,
      lower_threshold           = 2000,
      statistic_decrease        = "Average",
      statistic_increase        = "Average",
      time_aggregation_decrease = "Average",
      time_aggregation_increase = "Average",
      time_window_decrease      = 7,
      time_window_increase      = 1,
      upper_threshold           = 3000
    }
  }

  tags = var.tags
}
