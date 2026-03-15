####################
# KeyVault Secrets #
####################

data "azurerm_key_vault_secret" "slack_ipatente_monitor_email" {
  key_vault_id = var.key_vault_id
  name         = "SLACK-IPATENTE-MONITOR-EMAIL"
}
