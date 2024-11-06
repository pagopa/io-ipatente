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
  tenant_id                 = data.azurerm_client_config.current.client_id
  peps_snet_id              = data.azurerm_subnet.private_endpoints_subnet.id
  vault_private_dns_zone_id = data.azurerm_private_dns_zone.key_vault.id

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

  tags = local.tags
}
