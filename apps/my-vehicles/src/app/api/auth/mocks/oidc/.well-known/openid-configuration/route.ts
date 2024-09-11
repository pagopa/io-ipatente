import { NextResponse } from "next/server";

import { getConfiguration } from "../../../../../../../config";
import { getMockForbiddenResponse } from "../../../mocks-util";

export async function GET() {
  if (getConfiguration().IS_PRODUCTION) return getMockForbiddenResponse();

  const oidcIssuerUrl = getConfiguration().OIDC_ISSUER_URL;

  const response = {
    authorization_endpoint: `${oidcIssuerUrl}/authorize`,
    issuer: oidcIssuerUrl,
    jwks_uri: `${oidcIssuerUrl}/jwks`,
    response_modes_supported: ["form_post", "fragment", "query"],
    response_types_supported: ["code", "id_token"],
    scopes_supported: ["openid", "offline_access", "lollipop", "profile"],
    subject_types_supported: ["public"],
    token_endpoint: `${oidcIssuerUrl}/token`,
    userinfo_endpoint: `${oidcIssuerUrl}/userinfo`,
  };

  return NextResponse.json(response, { status: 200 });
}
