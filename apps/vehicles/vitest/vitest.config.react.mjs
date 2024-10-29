/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        ...configDefaults.coverage.exclude,
        "**/__tests__",
        "src/generated/**",

        // BE
        "src/app/*",
        "src/config/*",
        "src/lib/bff/*",
      ],
      ignoreEmptyLines: true,
      include: ["src/**/*.{tsx,ts}"],
      reporter: ["text", "html"],
    },
    css: true,
    env: loadEnv("test", process.cwd(), ""),
    environment: "jsdom",
    exclude: [
      ...configDefaults.exclude,
      "./vitest/vitest.setup.react.ts",
      "./vitest/vitest.setup.node.ts",
    ],
    globals: true,
    include: ["./src/**/*.test.tsx"],
    setupFiles: "./vitest/vitest.setup.react.ts",
    typecheck: {
      ignoreSourceErrors: true,
    },
  },
});
