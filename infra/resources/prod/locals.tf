locals {
  prefix               = "io"
  env_short            = "p"
  location_short       = "itn"
  location             = "italynorth"
  project              = "${local.prefix}-${local.env_short}-${local.location_short}"
  application_basename = "ipatente"
  domain               = "svc"

  tags = {
    CreatedBy      = "Terraform"
    Environment    = "Prod"
    Owner          = "IO"
    ManagementTeam = "IO Enti & Servizi"
    Source         = "https://github.com/pagopa/io-services-cms/infra/prod/italynorth"
    CostCenter     = "TS310 - PAGAMENTI & SERVIZI"
  }
}

