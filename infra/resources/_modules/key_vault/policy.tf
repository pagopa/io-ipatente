resource "azurerm_role_assignment" "apim_kv_secrets_read" {
  scope                = azurerm_key_vault.this.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = var.apim_principal_id
}
