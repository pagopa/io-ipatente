# io-ipatente

[![Code Review](https://github.com/pagopa/io-ipatente/actions/workflows/code-review.yaml/badge.svg?branch=main)](https://github.com/pagopa/io-ipatente/actions/workflows/code-review.yaml)

The project `io-ipatente` aims to provide, through [App IO](https://io.italia.it), some of the services currently provided by the **iPatente** mobile application _(managed by Motorizzazione Civile on behalf of the Ministry of Infrastructure and Transport)._

### 🚧 Work in Progress 🚧
This repository contains the code of the iPatente services that will be exposed as web applications through the App IO *services*.

1. `apps/licences` that exposes the web application for "Le mie patenti" service.
2. `apps/payments` that exposes the web application for "I miei pagamenti" service.
3. `apps/practices` that exposes the web application for "Le mie pratiche" service.
4. `apps/vehicles` that exposes the web application for "I miei veicoli" service.

These web applications are all [NextJS](https://nextjs.org/) projects.

## Requirements

This project requires specific versions of the following tools. To make sure your development setup matches with production follow the recommended installation methods.

- **Node.js**

  Use [nodenv](https://github.com/nodenv/nodenv) to install the [required version](.node-version) of `Node.js`.

  ```sh
  nodenv install
  node --version
  ```

- **Yarn**

  Yarn must be installed using [Corepack](https://yarnpkg.com/getting-started/install), included by default in `Node.js`.

  ```sh
  corepack enable
  yarn --version
  ```

- **Terraform**

  Use [tfenv](https://github.com/tfutils/tfenv) to install the [required version](.terraform-version) of `terraform`.

  ```sh
  tfenv install
  terraform version
  ```

- **pre-commit**

  [Follow the official documentation](https://pre-commit.com/) to install `pre-commit` in your machine.

  ```sh
  pre-commit install
  ```

## Local development

To test the `NextJS App` locally:

1. **Setup the Environment Variables.** Create a file called `.env.local` in each `NextJS App` folder (`./apps/*`) valued according to the environment variables listed in `.env.example`.

2. **Install the project (if you haven't already).** Run the following commands from the root folder.

```bash
# to install the dependencies
yarn
# to generate the TypeScript models based on OpenAPI specs
yarn workspace <prj-name> generate
# to build all projects
yarn build
```

3. **Run the Web App**. Run _(from the root folder)_ the following command

```bash
yarn workspace <prj-name> dev
```

### Mocking data with MSW
Each NextJS App uses [MSW](https://mswjs.io/), an API mocking library that allows you to write client-agnostic mocks and reuse them across any frameworks, tools, and environments.

To enable MSW in a specific NextJS App, set the following environment variables in `.env.local` file:

```bash
# enable MSW
NEXT_PUBLIC_IS_MSW_ENABLED=true
# enable mocks on Backend for frontend (for frontend development)
NEXT_PUBLIC_BFF_API_MOCKING=true
# enable mocks for external APIs (for backend development)
# !!! work in progress, to be confirmed !!!
NEXT_PUBLIC_EXTERNAL_API_MOCKING=true
```

## Release management

This project uses [changesets](https://github.com/changesets/changesets) to automate updating package versions, and changelogs.

Each Pull Request that includes changes that require a version bump should include a `changeset` file that describes that changes.

To create a new `changeset` file run the following command from the project root:

```bash
yarn changeset
```
