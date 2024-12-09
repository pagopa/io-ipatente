import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import pagopa from "@pagopa/eslint-config";
import pluginQuery from "@tanstack/eslint-plugin-query";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
export default [
  ...pagopa,
  ...compat.extends("next/core-web-vitals"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": "off",
    },
  },
  ...pluginQuery.configs["flat/recommended"],
];
