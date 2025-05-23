locals {
  prefix          = "io"
  env_short       = "p"
  location        = "italynorth"
  domain          = "ipatente"
  instance_number = "01"

  adgroups = {
    admins_name = "io-p-adgroup-svc-admins"
    devs_name   = "io-p-adgroup-svc-developers"
  }

  runner = {
    cae_name                = "${local.prefix}-${local.env_short}-itn-github-runner-cae-01"
    cae_resource_group_name = "${local.prefix}-${local.env_short}-itn-github-runner-rg-01"
    secret = {
      kv_name                = "${local.prefix}-${local.env_short}-kv-common"
      kv_resource_group_name = "${local.prefix}-${local.env_short}-rg-common"
    }
  }

  apim = {
    name                = "${local.prefix}-${local.env_short}-apim-v2-api"
    resource_group_name = "${local.prefix}-${local.env_short}-rg-internal"
  }

  apim_itn = {
    name                = "${local.prefix}-${local.env_short}-itn-apim-01"
    resource_group_name = "${local.prefix}-${local.env_short}-itn-common-rg-01"
  }

  vnet = {
    name                = "${local.prefix}-${local.env_short}-itn-common-vnet-01"
    resource_group_name = "${local.prefix}-${local.env_short}-itn-common-rg-01"
  }

  dns = {
    resource_group_name = "${local.prefix}-${local.env_short}-rg-external"
  }

  dns_zones = {
    resource_group_name = "${local.prefix}-${local.env_short}-rg-common"
  }

  tf_storage_account = {
    name                = "iopitntfst001"
    resource_group_name = "terraform-state-rg"
  }

  repository = {
    name               = "io-ipatente"
    description        = "iPatente services"
    topics             = ["io", "ipatente"]
    reviewers_teams    = ["io-platform-green-unit", "engineering-team-cloud-eng"]
    app_cd_policy_tags = ["io-ipatente-licences@*", "io-ipatente-payments@*", "io-ipatente-practices@*", "io-ipatente-vehicles@*"]
  }

  tags = {
    CreatedBy      = "Terraform"
    Environment    = "Prod"
    Owner          = "IO"
    ManagementTeam = "IO Enti & Servizi"
    Source         = "https://github.com/pagopa/io-ipatente/blob/main/infra/identity/prod"
    CostCenter     = "TS310 - PAGAMENTI & SERVIZI"
  }
}

