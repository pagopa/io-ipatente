locals {
  prefix    = "io"
  env_short = "p"
  env       = "prod"
  project   = "${local.prefix}-${local.env_short}"
  domain    = "ipatente"

  repo_name = "io-ipatente"

  tags = {
    CreatedBy      = "Terraform"
    Environment    = "Prod"
    Owner          = "IO"
    ManagementTeam = "IO Enti & Servizi"
    Source         = "https://github.com/pagopa/io-ipatente/blob/main/infra/identity/prod"
    CostCenter     = "TS310 - PAGAMENTI & SERVIZI"
  }
}
