######################
#  Common Variables  #
######################

variable "prefix" {
  type    = string
  default = "io"
  validation {
    condition = (
      length(var.prefix) < 6
    )
    error_message = "Max length is 6 chars."
  }
}

variable "env_short" {
  type = string
  validation {
    condition = (
      length(var.env_short) <= 1
    )
    error_message = "Max length is 1 chars."
  }
}

variable "location" {
  type        = string
  description = "Azure region"
}

variable "domain" {
  type        = string
  description = "Domain name of the application"
}

variable "tags" {
  type        = map(any)
  description = "Resource tags"
}

variable "resource_group_name" {
  type        = string
  description = "Resource group name for the Function App services"
}

################
#  Networking  #
################
variable "payments_snet_cidr" {
  type        = string
  description = "Licences Subnet CIDR"
}

variable "virtual_network" {
  type = object({
    name                = string
    resource_group_name = string
  })
  description = "Virtual network to create subnet in"
}

variable "peps_snet_id" {
  type        = string
  description = "Id of the subnet which holds private endpoints"
}

variable "private_dns_zone_resource_group_name" {
  type        = string
  description = "Resource group name of the private DNS zone to use for private endpoints"
}

variable "ai_connection_string" {
  type        = string
  sensitive   = true
  description = "Application Insights connection string"
}


variable "key_vault_name" {
  type        = string
  description = "Key Vault name"
}
