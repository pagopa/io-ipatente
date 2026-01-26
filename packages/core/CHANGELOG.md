# @io-ipatente/core

## 1.0.2

### Patch Changes

- d39f9e8: empty patch bump for restarting release

## 1.0.1

### Patch Changes

- eb8e14d: pnpm migration

## 1.0.0

### Major Changes

- d9c10b4: centralized error logging and improve error ownership

## 0.9.0

### Minor Changes

- 25ab37b: Package core: Add logger factory fn, override next-auth error logger level. Apps: logger refactor

## 0.8.0

### Minor Changes

- 3405a65: Add new logger package with pino for serverside logging

## 0.7.5

### Patch Changes

- bbc64d4: Added redirectPath cookie on consent page redirection

## 0.7.4

### Patch Changes

- 1b05897: Updated redirectPath definition on middleware and usage on consent page

## 0.7.3

### Patch Changes

- 008a178: Updated consent page redirect, cleanup logs

## 0.7.2

### Patch Changes

- cd0c22f: Added debug logs on signin and middleware

## 0.7.1

### Patch Changes

- 6b61165: Added debug logs for auth and consent page

## 0.7.0

### Minor Changes

- eaa0ae2: manage redirect URL after consent page

### Patch Changes

- 79dde6c: patch middleware
- 44f7fda: Revert: Redirect users to license details

## 0.6.3

### Patch Changes

- e516e10: update axios config
- 838ac09: Add favicon

## 0.6.2

### Patch Changes

- 914cd49: refactor duplication

## 0.6.1

### Patch Changes

- 0f765b0: Fix middleware
- aec656e: Update Next to v14.2.20

## 0.6.0

### Minor Changes

- f319d92: Add consent screen

## 0.5.16

### Patch Changes

- 051fc4b: Minor fixes

## 0.5.15

### Patch Changes

- b256e78: CleanUp no longer needed logs on auth callback

## 0.5.14

### Patch Changes

- 538bb64: Set cookie test

## 0.5.13

### Patch Changes

- e532ce2: Set Cookie Secure

## 0.5.12

### Patch Changes

- 95bff35: Fix Callback URL

## 0.5.11

### Patch Changes

- 5a5d1b3: Build callbackUrl from proxy headers

## 0.5.10

### Patch Changes

- 7462e0d: Bypass AppGateway on Vehicles

## 0.5.9

### Patch Changes

- 80afcfc: Set cookie domain in auth callback

## 0.5.8

### Patch Changes

- f64dafe: Cookie Set without prefix

## 0.5.7

### Patch Changes

- 855dd29: Fix cookie selection

## 0.5.6

### Patch Changes

- 0906d71: Auth Callback Redirect Updates

## 0.5.5

### Patch Changes

- f041e5e: Replace Origin

## 0.5.4

### Patch Changes

- f0db89c: Force set callback host redirect

## 0.5.3

### Patch Changes

- 634dc6a: Set Origin on redirect callback url

## 0.5.2

### Patch Changes

- 0371c68: Added some auth logs

## 0.5.1

### Patch Changes

- 35c809a: Middleware refinement
- fa6b274: Set NextAuth maxAge

## 0.5.0

### Minor Changes

- 7e84a75: add download file endpoint

## 0.4.8

### Patch Changes

- c7257ed: Move auth callback route to @io-ipatente/core
- 12298f7: Show badge licence points in the licenses page

## 0.4.7

### Patch Changes

- fd391b1: add keepalive config

## 0.4.6

### Patch Changes

- e1fa273: ADD Internal Route for InfoVeicoli API SOAK Test

## 0.4.5

### Patch Changes

- 1ee2fcb: fix test types

## 0.4.4

### Patch Changes

- e56699e: App vehicles: bff code refactored into @io-ipatente/core package

## 0.4.3

### Patch Changes

- 359000c: Added OIDC_MOCK_FORCED_ENABLE env config, for OIDC issuer explicit mock enable

## 0.4.2

### Patch Changes

- fafc2a6: Remove trustHost config, now this is handled through ENV conf

## 0.4.1

### Patch Changes

- 937ee93: Set Trust Host AuthJS conf

## 0.4.0

### Minor Changes

- f67d2b9: fix authentication flow in dev mode

## 0.3.0

### Minor Changes

- 6fd5a08: Move middleware and auth config to @io-ipatente/core

## 0.2.0

### Minor Changes

- 738cc18: move config to @io-ipatente/core
- fa97d5e: Added interop msw mock

## 0.1.0

### Minor Changes

- 5da5e19: Added generateClientAssertion function for PDND interop client assertion
- 895c829: Added requestVoucher to @io-ipatente/core package
