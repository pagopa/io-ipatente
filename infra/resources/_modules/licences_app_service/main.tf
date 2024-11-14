#################
#  App Service  #
#################

module "licences" {
  source = "github.com/pagopa/dx//infra/modules/azure_app_service?ref=main"

  environment = {
    prefix          = var.prefix
    env_short       = var.env_short
    location        = var.location
    domain          = var.domain
    app_name        = "licences"
    instance_number = "01"
  }

  resource_group_name = var.resource_group_name
  health_check_path   = "/api/info"
  node_version        = 20

  subnet_cidr                          = var.licences_snet_cidr
  subnet_pep_id                        = var.peps_snet_id
  private_dns_zone_resource_group_name = var.private_dns_zone_resource_group_name
  virtual_network = {
    name                = var.virtual_network.name
    resource_group_name = var.virtual_network.resource_group_name
  }

  app_settings = merge(local.licences.base_app_settings, local.licences.prod_app_setting)

  slot_app_settings = merge(local.licences.base_app_settings, local.licences.staging_app_setting)

  sticky_app_setting_names = local.licences.sticky_settings

  tier = local.licences.tier

  tags = var.tags
}

module "licences_app_service_roles" {
  source       = "github.com/pagopa/dx//infra/modules/azure_role_assignments?ref=main"
  principal_id = module.licences.app_service.app_service.principal_id

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

module "licences_app_service_staging_roles" {
  source       = "github.com/pagopa/dx//infra/modules/azure_role_assignments?ref=main"
  principal_id = module.licences.app_service.app_service.slot.principal_id

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