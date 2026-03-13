output "action_group_ids" {
  value = {
    offcall = azurerm_monitor_action_group.offcall_action_group.id
  }
  description = "Ids of the action groups for monitoring"
}
