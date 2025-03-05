data "azurerm_resource_group" "main" {
  name = "${local.project}-${local.domain}-rg-01"
}

module "key_vault" {
  source                    = "../_modules/key_vault"
  prefix                    = local.prefix
  env_short                 = local.env_short
  location_short            = local.location_short
  domain                    = local.domain
  location                  = local.location
  resource_group_name       = data.azurerm_resource_group.main.name
  tenant_id                 = data.azurerm_client_config.current.tenant_id
  peps_snet_id              = data.azurerm_subnet.private_endpoints_subnet.id
  vault_private_dns_zone_id = data.azurerm_private_dns_zone.key_vault.id
  apim_principal_id         = data.azurerm_api_management.apim_itn.identity[0].principal_id

  tags = local.tags
}

module "vehicles_app_service" {
  source              = "../_modules/vehicles_app_service"
  prefix              = local.prefix
  env_short           = local.env_short
  location            = local.location
  domain              = local.domain
  resource_group_name = data.azurerm_resource_group.main.name

  virtual_network = {
    name                = data.azurerm_virtual_network.itn_common.name
    resource_group_name = data.azurerm_virtual_network.itn_common.resource_group_name
  }

  peps_snet_id                         = data.azurerm_subnet.private_endpoints_subnet.id
  private_dns_zone_resource_group_name = data.azurerm_resource_group.weu-common.name
  vehicles_snet_cidr                   = local.vehicles_snet_cidr

  ai_connection_string = data.azurerm_application_insights.ai_common.connection_string
  key_vault_name       = module.key_vault.key_vault_name

  tags = local.tags
}

module "licences_app_service" {
  source              = "../_modules/licences_app_service"
  prefix              = local.prefix
  env_short           = local.env_short
  location            = local.location
  domain              = local.domain
  resource_group_name = data.azurerm_resource_group.main.name

  virtual_network = {
    name                = data.azurerm_virtual_network.itn_common.name
    resource_group_name = data.azurerm_virtual_network.itn_common.resource_group_name
  }

  peps_snet_id                         = data.azurerm_subnet.private_endpoints_subnet.id
  private_dns_zone_resource_group_name = data.azurerm_resource_group.weu-common.name
  licences_snet_cidr                   = local.licences_snet_cidr

  ai_connection_string = data.azurerm_application_insights.ai_common.connection_string
  key_vault_name       = module.key_vault.key_vault_name

  tags = local.tags
}


module "payments_app_service" {
  source              = "../_modules/payments_app_service"
  prefix              = local.prefix
  env_short           = local.env_short
  location            = local.location
  domain              = local.domain
  resource_group_name = data.azurerm_resource_group.main.name

  virtual_network = {
    name                = data.azurerm_virtual_network.itn_common.name
    resource_group_name = data.azurerm_virtual_network.itn_common.resource_group_name
  }

  peps_snet_id                         = data.azurerm_subnet.private_endpoints_subnet.id
  private_dns_zone_resource_group_name = data.azurerm_resource_group.weu-common.name
  payments_snet_cidr                   = local.payments_snet_cidr

  ai_connection_string = data.azurerm_application_insights.ai_common.connection_string
  key_vault_name       = module.key_vault.key_vault_name

  tags = local.tags
}

module "practices_app_service" {
  source              = "../_modules/practices_app_service"
  prefix              = local.prefix
  env_short           = local.env_short
  location            = local.location
  domain              = local.domain
  resource_group_name = data.azurerm_resource_group.main.name

  virtual_network = {
    name                = data.azurerm_virtual_network.itn_common.name
    resource_group_name = data.azurerm_virtual_network.itn_common.resource_group_name
  }

  peps_snet_id                         = data.azurerm_subnet.private_endpoints_subnet.id
  private_dns_zone_resource_group_name = data.azurerm_resource_group.weu-common.name
  practices_snet_cidr                  = local.practices_snet_cidr

  ai_connection_string = data.azurerm_application_insights.ai_common.connection_string
  key_vault_name       = module.key_vault.key_vault_name

  tags = local.tags
}