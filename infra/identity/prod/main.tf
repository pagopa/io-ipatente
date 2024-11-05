terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>4.0"
    }

    azuread = {
      source  = "hashicorp/azuread"
      version = "~>2.0"
    }
  }

  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "iopitntfst001"
    container_name       = "terraform-state"
    key                  = "io-ipatente.identity.prod.tfstate"
  }
}

provider "azurerm" {
  features {
  }
}

data "azurerm_subscription" "current" {}

data "azuread_group" "admins" {
  display_name = "io-p-adgroup-svc-admins"
}

data "azuread_group" "developers" {
  display_name = "io-p-adgroup-svc-developers"
}

module "repo" {
  source = "github.com/pagopa/dx//infra/modules/azure_repo_starter_pack?ref=DEVEX-179-produrre-un-modulo-terraform-per-migliorare-la-gestione-dei-permessi-rbac-sui-resource-group"

  environment = {
    prefix          = local.prefix
    env_short       = local.env_short
    location        = local.location
    domain          = local.domain
    instance_number = "01"
  }

  entraid_groups = {
    admins_object_id = data.azuread_group.admins.object_id
    devs_object_id   = data.azuread_group.developers.object_id
  }

  terraform_storage_account = {
    resource_group_name = "terraform-state-rg"
    name                = "iopitntfst001"
  }

  subscription_id = data.azurerm_subscription.current.id

  repository_name = local.repo_name

  tags = local.tags
}

# module "app_federated_identities" {
#   source = "github.com/pagopa/dx//infra/modules/azure_federated_identity_with_github?ref=main"

#   continuos_integration = { enable = false }

#   prefix    = local.prefix
#   env_short = local.env_short
#   env       = "app-${local.env}"
#   domain    = "${local.domain}-app"
#   location  = local.location

#   repositories = [local.repo_name]

#   tags = local.tags
# }

# module "opex_federated_identities" {
#   source = "github.com/pagopa/dx//infra/modules/azure_federated_identity_with_github?ref=main"

#   prefix    = local.prefix
#   env_short = local.env_short
#   env       = "opex-${local.env}"
#   domain    = "${local.domain}-opex"
#   location  = local.location

#   repositories = [local.repo_name]

#   continuos_integration = {
#     enable = true
#     roles = {
#       subscription = ["Reader"]
#       resource_groups = {
#         dashboards = [
#           "Reader"
#         ],
#         terraform-state-rg = [
#           "Storage Blob Data Reader",
#           "Reader and Data Access",
#         ]
#       }
#     }
#   }

#   continuos_delivery = {
#     enable = true
#     roles = {
#       subscription = ["Reader"]
#       resource_groups = {
#         dashboards = [
#           "Contributor"
#         ],
#         terraform-state-rg = [
#           "Storage Blob Data Contributor",
#           "Reader and Data Access"
#         ]
#       }
#     }
#   }

#   tags = local.tags
# }
