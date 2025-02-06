terraform {
  backend "azurerm" {
    resource_group_name  = "terraform-state-rg"
    storage_account_name = "iopitntfst001"
    container_name       = "terraform-state"
    key                  = "io-ipatente.resources.prod.tfstate"
    use_azuread_auth     = true
  }

  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>4"
    }
    azuread = {
      source  = "hashicorp/azuread"
      version = "~>3"
    }
  }
}

provider "azurerm" {
  features {}
  storage_use_azuread = true
}
