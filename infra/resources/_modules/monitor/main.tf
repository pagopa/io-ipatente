##########
# Alerts #
##########
resource "azurerm_monitor_action_group" "offcall_action_group" {
  resource_group_name = var.resource_group_name
  name                = "${var.prefix}-${var.env_short}-${var.domain}-offcall-ag-01"
  short_name          = "ipat-offcall"

  email_receiver {
    name                    = "SendToSlack"
    email_address           = data.azurerm_key_vault_secret.slack_ipatente_monitor_email.value
    use_common_alert_schema = true
  }

  tags = var.tags
}
