locals {
  repository = {
    name               = "io-ipatente"
    description        = "iPatente services"
    topics             = ["io", "ipatente"]
    reviewers_teams    = ["io-institutions-n-services", "engineering-team-cloud-eng"]
    app_cd_policy_tags = ["io-ipatente-licences@*", "io-ipatente-payments@*", "io-ipatente-practices@*", "io-ipatente-vehicles@*"]
    jira_boards_ids    = ["IO-PAE", "CES"]
  }
}
