# licences_app_service

<!-- BEGIN_TF_DOCS -->
## Requirements

No requirements.

## Providers

No providers.

## Modules

| Name | Source | Version |
|------|--------|---------|
| <a name="module_licences"></a> [licences](#module\_licences) | github.com/pagopa/dx//infra/modules/azure_app_service | main |
| <a name="module_licences_app_service_roles"></a> [licences\_app\_service\_roles](#module\_licences\_app\_service\_roles) | github.com/pagopa/dx//infra/modules/azure_role_assignments | main |
| <a name="module_licences_app_service_staging_roles"></a> [licences\_app\_service\_staging\_roles](#module\_licences\_app\_service\_staging\_roles) | github.com/pagopa/dx//infra/modules/azure_role_assignments | main |

## Resources

No resources.

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|:--------:|
| <a name="input_ai_connection_string"></a> [ai\_connection\_string](#input\_ai\_connection\_string) | Application Insights connection string | `string` | n/a | yes |
| <a name="input_domain"></a> [domain](#input\_domain) | Domain name of the application | `string` | n/a | yes |
| <a name="input_env_short"></a> [env\_short](#input\_env\_short) | n/a | `string` | n/a | yes |
| <a name="input_key_vault_name"></a> [key\_vault\_name](#input\_key\_vault\_name) | Key Vault name | `string` | n/a | yes |
| <a name="input_licences_snet_cidr"></a> [licences\_snet\_cidr](#input\_licences\_snet\_cidr) | Licences Subnet CIDR | `string` | n/a | yes |
| <a name="input_location"></a> [location](#input\_location) | Azure region | `string` | n/a | yes |
| <a name="input_peps_snet_id"></a> [peps\_snet\_id](#input\_peps\_snet\_id) | Id of the subnet which holds private endpoints | `string` | n/a | yes |
| <a name="input_prefix"></a> [prefix](#input\_prefix) | n/a | `string` | `"io"` | no |
| <a name="input_private_dns_zone_resource_group_name"></a> [private\_dns\_zone\_resource\_group\_name](#input\_private\_dns\_zone\_resource\_group\_name) | Resource group name of the private DNS zone to use for private endpoints | `string` | n/a | yes |
| <a name="input_resource_group_name"></a> [resource\_group\_name](#input\_resource\_group\_name) | Resource group name for the Function App services | `string` | n/a | yes |
| <a name="input_tags"></a> [tags](#input\_tags) | Resource tags | `map(any)` | n/a | yes |
| <a name="input_virtual_network"></a> [virtual\_network](#input\_virtual\_network) | Virtual network to create subnet in | <pre>object({<br>    name                = string<br>    resource_group_name = string<br>  })</pre> | n/a | yes |

## Outputs

No outputs.
<!-- END_TF_DOCS -->