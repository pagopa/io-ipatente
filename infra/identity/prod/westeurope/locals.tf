locals {
  prefix    = "dx"
  env_short = "p"
  env       = "prod"
  location  = "westeurope"
  project   = "${local.prefix}-${local.env_short}"
  domain    = "typescript"

  repo_name = "io-ipatente"

  tags = {
    CreatedBy      = "Terraform"
    Environment    = "Prod"
    Owner          = "IO"
    ManagementTeam = "IO Enti & Servizi"
    Source         = "https://github.com/pagopa/io-ipatente/blob/main/infra/identity/prod/westeurope"
    CostCenter     = "TS310 - PAGAMENTI & SERVIZI"
  }
}
