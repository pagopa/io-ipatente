
data "azurerm_api_management" "apim_v2" {
  name                = "${var.prefix}-${var.env_short}-apim-v2-api"
  resource_group_name = "${var.prefix}-${var.env_short}-rg-internal"
}
