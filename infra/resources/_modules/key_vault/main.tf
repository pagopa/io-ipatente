resource "azurerm_key_vault" "this" {
  name                = "${var.prefix}-${var.env_short}-${var.location_short}-${var.domain}-kv-01"
  location            = var.location
  resource_group_name = var.resource_group_name
  tenant_id           = var.tenant_id

  soft_delete_retention_days = 90
  purge_protection_enabled   = true
  sku_name                   = "premium"

  enabled_for_disk_encryption   = true
  enable_rbac_authorization     = true
  public_network_access_enabled = false

  network_acls {
    bypass         = "AzureServices"
    default_action = "Allow"
  }

  tags = var.tags
}

resource "azurerm_private_endpoint" "vault" {
  name                = "${var.prefix}-${var.env_short}-${var.location_short}-${var.domain}-kv-pep-01"
  location            = var.location
  resource_group_name = var.resource_group_name
  subnet_id           = var.peps_snet_id

  private_service_connection {
    name                           = "${var.prefix}-${var.env_short}-${var.location_short}-${var.domain}-kv-pep-01"
    private_connection_resource_id = azurerm_key_vault.this.id
    is_manual_connection           = false
    subresource_names              = ["vault"]
  }

  private_dns_zone_group {
    name                 = "private-dns-zone-group"
    private_dns_zone_ids = [var.vault_private_dns_zone_id]
  }

  tags = var.tags
}
