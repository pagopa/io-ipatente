locals {
  prefix    = "io"
  env_short = "p"
  repo_name = "io-ipatente"

  tags = {
    CreatedBy      = "Terraform"
    Environment    = "Prod"
    Owner          = "IO"
    ManagementTeam = "IO Enti & Servizi"
    Source         = "https://github.com/pagopa/io-ipatente/blob/main/infra/github-runner/prod/westeurope"
    CostCenter     = "TS310 - PAGAMENTI & SERVIZI"
  }
}
