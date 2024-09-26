import "i18next";

import resources from "./resources.js";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "common";
    resources: typeof resources;
  }
}
