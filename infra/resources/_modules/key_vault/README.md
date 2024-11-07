# key_vault

<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

| Name | Version |
|------|---------|
| <a name="provider_azurerm"></a> [azurerm](#provider\_azurerm) | n/a |

## Modules

No modules.

## Resources

| Name | Type |
|------|------|
| [azurerm_key_vault.this](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/key_vault) | resource |
| [azurerm_private_endpoint.vault](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/private_endpoint) | resource |
| [azurerm_role_assignment.apim_kv_secrets_read](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/role_assignment) | resource |

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_apim_principal_id"></a> [apim\_principal\_id](#input\_apim\_principal\_id) | Id of the APIM-assigned managed identity | `string` | n/a | yes |
| <a name="input_domain"></a> [domain](#input\_domain) | Domain name of the application | `string` | n/a | yes |
| <a name="input_env_short"></a> [env\_short](#input\_env\_short) | n/a | `string` | n/a | yes |
| <a name="input_location"></a> [location](#input\_location) | Azure region | `string` | n/a | yes |
| <a name="input_location_short"></a> [location\_short](#input\_location\_short) | Azure region | `string` | n/a | yes |
| <a name="input_peps_snet_id"></a> [peps\_snet\_id](#input\_peps\_snet\_id) | Id of the subnet which holds private endpoints | `string` | n/a | yes |
| <a name="input_prefix"></a> [prefix](#input\_prefix) | n/a | `string` | `"io"` | no |
| <a name="input_resource_group_name"></a> [resource\_group\_name](#input\_resource\_group\_name) | Resource group name for the Function App services | `string` | n/a | yes |
| <a name="input_tags"></a> [tags](#input\_tags) | Resource tags | `map(any)` | n/a | yes |
| <a name="input_tenant_id"></a> [tenant\_id](#input\_tenant\_id) | Id of the Tenant to deploy the KeyVault | `string` | n/a | yes |
| <a name="input_vault_private_dns_zone_id"></a> [vault\_private\_dns\_zone\_id](#input\_vault\_private\_dns\_zone\_id) | Id of the KeyVault Private DNS Zone | `string` | n/a | yes |

## Outputs

| Name | Description |
|------|-------------|
| <a name="output_key_vault_id"></a> [key\_vault\_id](#output\_key\_vault\_id) | n/a |
<!-- END_TF_DOCS -->
