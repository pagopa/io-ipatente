module "vehicles_app_service_autoscaler" {
  source = "github.com/pagopa/dx//infra/modules/azure_app_service_plan_autoscaler?ref=main"

  resource_group_name = var.resource_group_name

  target_service = {
    app_service_name = module.vehicles.app_service.app_service.name
  }

  scheduler = {
    maximum = local.vehicles.autoscale_settings.max
    normal_load = {
      default = local.vehicles.autoscale_settings.default
      minimum = local.vehicles.autoscale_settings.min
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
