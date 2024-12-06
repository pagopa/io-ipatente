# vehicles

## 0.8.9

### Patch Changes

- 0e002bf: update openapis with codiceFiscale required in header
- 6c2b0ae: detail icon became static
- Updated dependencies [7e84a75]
  - @io-ipatente/core@0.5.0
  - @io-ipatente/ui@0.8.0

## 0.8.8

### Patch Changes

- b542630: handle nullable fields returned by e-services
- cdce8d0: Refinement of Assistance page
- ef2b5bf: practices list and detail
- c7257ed: Move auth callback route to @io-ipatente/core
- 12298f7: Show badge licence points in the licenses page
- Updated dependencies [943b6e3]
- Updated dependencies [cdce8d0]
- Updated dependencies [ef2b5bf]
- Updated dependencies [a0ddaea]
- Updated dependencies [c7257ed]
- Updated dependencies [12298f7]
  - @io-ipatente/ui@0.7.0
  - @io-ipatente/core@0.4.8

## 0.8.7

### Patch Changes

- 50a5472: update app service

## 0.8.6

### Patch Changes

- 8a9ded0: Deploy vehicles to root appGateway instead of subfolder

## 0.8.5

### Patch Changes

- cdb11c2: Vehicles App on domain root

## 0.8.4

### Patch Changes

- 7a3ac0f: Set apiGateway URL for vehicles app

## 0.8.3

### Patch Changes

- fd391b1: add keepalive config
- Updated dependencies [fd391b1]
  - @io-ipatente/core@0.4.7

## 0.8.2

### Patch Changes

- 22f0f53: copy review

## 0.8.1

### Patch Changes

- e1fa273: ADD Internal Route for InfoVeicoli API SOAK Test
- Updated dependencies [e1fa273]
  - @io-ipatente/core@0.4.6
  - @io-ipatente/ui@0.6.1

## 0.8.0

### Minor Changes

- 6af362e: add loading state to LicenceDetails and VehicleDetails

### Patch Changes

- Updated dependencies [eb328f0]
- Updated dependencies [31a7ce5]
- Updated dependencies [6af362e]
- Updated dependencies [4d3da08]
  - @io-ipatente/ui@0.6.0

## 0.7.5

### Patch Changes

- 27cca97: Revert to ApplicationInsight SDK OTel
- 050ecb9: Copy review
- cf878e3: add EXTRAM_MSG_006 code
- Updated dependencies [050ecb9]
  - @io-ipatente/ui@0.5.1

## 0.7.4

### Patch Changes

- d3cb87b: CleanUp OpenTelemetry Configuration
- Updated dependencies [1ee2fcb]
  - @io-ipatente/core@0.4.5

## 0.7.3

### Patch Changes

- e56699e: App vehicles: bff code refactored into @io-ipatente/core package
- e4f2a25: Register OpenTelementry exporter to Azure Monitor using @vercel/otel
- a7a7641: wrap the select function in useCallback
- Updated dependencies [e56699e]
  - @io-ipatente/core@0.4.4

## 0.7.2

### Patch Changes

- cc2d7ea: Check for OIDC_MOCK_FORCED_ENABLE instead of IS_PRODUCTION in all OIDC mocks

## 0.7.1

### Patch Changes

- 359000c: Added OIDC_MOCK_FORCED_ENABLE env config, for OIDC issuer explicit mock enable
- Updated dependencies [359000c]
  - @io-ipatente/core@0.4.3

## 0.7.0

### Minor Changes

- df1a3d5: Add floating button component

### Patch Changes

- Updated dependencies [df1a3d5]
- Updated dependencies [fafc2a6]
  - @io-ipatente/ui@0.5.0
  - @io-ipatente/core@0.4.2

## 0.6.2

### Patch Changes

- Updated dependencies [937ee93]
  - @io-ipatente/core@0.4.1

## 0.6.1

### Patch Changes

- 7655100: Instantiate Otel Application Insight throgh nextJS instrumentation hook
- Updated dependencies [f67d2b9]
  - @io-ipatente/core@0.4.0

## 0.6.0

### Minor Changes

- 6fd5a08: Move middleware and auth config to @io-ipatente/core

### Patch Changes

- acb14ab: Change Env Prod url
- Updated dependencies [6fd5a08]
  - @io-ipatente/core@0.3.0

## 0.5.0

### Minor Changes

- 738cc18: move config to @io-ipatente/core
- 57a77ac: Updated vitest config, added withVoucherHandler and withJWTAuthAndVoucherHandler wrappers, added singleton external api client, added business logic for retrieveVehicles, wrapped up infoVeicoli api
- 684bcfb: Add ButtonNaked to TopBar Component and add Assistance page
- c9c10de: Add breadcrumbs in vehicles detail page
- fa97d5e: Added interop msw mock
- e73b4a6: Add Generic error component in vehicles
- d478796: Update RCA empty state in vehicle detail
- 78c83ac: Update CardInfo component and RCA list empty state
- 56b5fc5: Add DialogProvider and Dialog component
- 56b5fc5: add some icons - add info icon for extra mass item - add modal component
- 7615ce6: removed button naked from TopBar and add assistence in AppLayout
- 8c5b99b: Update icons mapping

### Patch Changes

- 05390a1: Add redirect from root to vehicles base path
- Updated dependencies [738cc18]
- Updated dependencies [684bcfb]
- Updated dependencies [0f6f4e1]
- Updated dependencies [fa97d5e]
- Updated dependencies [e73b4a6]
- Updated dependencies [78c83ac]
- Updated dependencies [56b5fc5]
- Updated dependencies [56b5fc5]
- Updated dependencies [7615ce6]
  - @io-ipatente/core@0.2.0
  - @io-ipatente/ui@0.4.0

## 0.4.0

### Minor Changes

- 2b63b12: Add EmptyState component

### Patch Changes

- Updated dependencies [2b63b12]
  - @io-ipatente/ui@0.3.0

## 0.3.1

### Patch Changes

- 5dcb84a: Removal of license plate for each inspection
- Updated dependencies [5dcb84a]
  - @io-ipatente/ui@0.2.1

## 0.3.0

### Minor Changes

- d912a16: Added infoVeicoli API handler, fix next-auth JWT type augmentation, fix withJWTAuthHandler get session, minor updates
- 01e16b5: Refinement of ListItemAction
- 4726cf6: Add vehicle details
- 782f8fa: Added withJWTAuthHandler bff wrapper

### Patch Changes

- 595f593: Add user's vehicle list
- 5da5e19: Added generateClientAssertion function for PDND interop client assertion
- 091d3c4: Updated io-ipatente-vehicles openapi and msw mock data
- Updated dependencies [595f593]
- Updated dependencies [5da5e19]
- Updated dependencies [01e16b5]
- Updated dependencies [4726cf6]
- Updated dependencies [9b6a1c7]
- Updated dependencies [895c829]
  - @io-ipatente/ui@0.2.0
  - @io-ipatente/core@0.1.0

## 0.2.1

### Patch Changes

- d4badad: Add PagoPA author on apps and packages package.json
- Updated dependencies [d4badad]
  - @io-ipatente/ui@0.1.1

## 0.2.0

### Minor Changes

- 57d18ac: Added MSW and OIDC mocks
- 249bc1a: update dependencies and rename theme
- 28495f9: Added @ipatente/ui package
- ce382e6: Add first FIMS integration version with next-auth library
- b13614f: Added eslint and prettier configuration
- 78886bc: Added mui-italia
- 7b7217d: Added i18n internationalization
- 8a14007: Added AppLayout, updated mui dependencies
- 9ac2b93: Updated coverage script in package.json
- 524c3f2: Added missing axios dependency
- d748012: Added vitest configuration

### Patch Changes

- 9203191: Updated openapi specs and related msw mocks
- Updated dependencies [49c3982]
- Updated dependencies [a3ee5e1]
- Updated dependencies [249bc1a]
- Updated dependencies [fdbf1e2]
- Updated dependencies [1a45fa5]
- Updated dependencies [2679ba4]
- Updated dependencies [e459654]
- Updated dependencies [09b37be]
- Updated dependencies [28495f9]
- Updated dependencies [78886bc]
- Updated dependencies [6ea2898]
- Updated dependencies [8a14007]
- Updated dependencies [4ed618a]
- Updated dependencies [be282bc]
- Updated dependencies [9191f36]
- Updated dependencies [8f53315]
  - @io-ipatente/ui@0.1.0
