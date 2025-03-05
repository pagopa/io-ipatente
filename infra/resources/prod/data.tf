data "azurerm_client_config" "current" {}

data "azurerm_subscription" "current" {}

data "azurerm_resource_group" "weu-common" {
  name = "${local.prefix}-${local.env_short}-rg-common"
}

data "azurerm_api_management" "apim_v2" {
  name                = "${local.prefix}-${local.env_short}-apim-v2-api"
  resource_group_name = "${local.prefix}-${local.env_short}-rg-internal"
}

# APIM itn

data "azurerm_api_management" "apim_itn" {
  name                = "${local.prefix}-${local.env_short}-itn-apim-01"
  resource_group_name = "${local.prefix}-${local.env_short}-itn-common-rg-01"
}

data "azurerm_virtual_network" "itn_common" {
  name                = "${local.project}-common-vnet-01"
  resource_group_name = "${local.project}-common-rg-01"
}

data "azurerm_subnet" "private_endpoints_subnet" {
  name                 = "${local.project}-pep-snet-01"
  virtual_network_name = data.azurerm_virtual_network.itn_common.name
  resource_group_name  = data.azurerm_virtual_network.itn_common.resource_group_name
}

data "azurerm_application_insights" "ai_common" {
  name                = "${local.prefix}-${local.env_short}-ai-common"
  resource_group_name = "${local.prefix}-${local.env_short}-rg-common"
}

data "azurerm_private_dns_zone" "key_vault" {
  name                = "privatelink.vaultcore.azure.net"
  resource_group_name = data.azurerm_resource_group.weu-common.name
}
