#################
#  App Service  #
#################

module "practices" {
  source  = "pagopa/dx-azure-app-service/azurerm"
  version = "~> 0"

  environment = {
    prefix          = var.prefix
    env_short       = var.env_short
    location        = var.location
    domain          = var.domain
    app_name        = "practices"
    instance_number = "01"
  }

  resource_group_name = var.resource_group_name
  health_check_path   = "/api/info"
  node_version        = 20

  subnet_cidr                          = var.practices_snet_cidr
  subnet_pep_id                        = var.peps_snet_id
  private_dns_zone_resource_group_name = var.private_dns_zone_resource_group_name
  virtual_network = {
    name                = var.virtual_network.name
    resource_group_name = var.virtual_network.resource_group_name
  }

  app_settings = merge(local.practices.base_app_settings, local.practices.prod_app_setting)

  slot_app_settings = merge(local.practices.base_app_settings, local.practices.staging_app_setting)

  sticky_app_setting_names = local.practices.sticky_settings

  tier = local.practices.tier

  tags = var.tags
}

module "practices_app_service_roles" {
  source  = "pagopa/dx-azure-role-assignments/azurerm"
  version = "~> 0"

  principal_id = module.practices.app_service.app_service.principal_id
  key_vault = [
    {
      name                = var.key_vault_name
      resource_group_name = var.resource_group_name
      roles = {
        secrets = "reader"
      }
    }
  ]
}

module "practices_app_service_staging_roles" {
  source  = "pagopa/dx-azure-role-assignments/azurerm"
  version = "~> 0"

  principal_id = module.practices.app_service.app_service.slot.principal_id
  key_vault = [
    {
      name                = var.key_vault_name
      resource_group_name = var.resource_group_name
      roles = {
        secrets = "reader"
      }
    }
  ]
}
