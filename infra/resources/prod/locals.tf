locals {
  prefix               = "io"
  env_short            = "p"
  location_short       = "itn"
  location             = "italynorth"
  project              = "${local.prefix}-${local.env_short}-${local.location_short}"
  application_basename = "ipatente"
  domain               = "ipatente"

  # Picked as the first available non-allocated CIDR from the io-p-itn-common-vnet-01
  vehicles_snet_cidr = "10.20.21.0/24"

  tags = {
    CreatedBy      = "Terraform"
    Environment    = "Prod"
    Owner          = "IO"
    ManagementTeam = "IO Enti & Servizi"
    Source         = "https://github.com/pagopa/io-ipatente/infra/prod"
    CostCenter     = "TS310 - PAGAMENTI & SERVIZI"
  }
}

