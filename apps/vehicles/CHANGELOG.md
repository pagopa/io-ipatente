# vehicles

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
