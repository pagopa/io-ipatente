resource "azurerm_role_assignment" "apim_kv_secrets_read" {
  scope                = azurerm_key_vault.this.id
  role_definition_name = "Key Vault Secrets User"
  principal_id         = data.azurerm_api_management.apim_v2.identity[0].principal_id
}
