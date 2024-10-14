/// <reference types="vitest" />
/// <reference types="vite/client" />

import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";
import { loadEnv } from "vite";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude
          ? configDefaults.coverage.exclude
          : []),
        ".next/*",
        "mocks/*",
        "public/*",
        "*.config.js",
        "src/generated/**",
        "src/config/*",
        "src/types/*",
        "src/main.ts",
        "src/config.ts",
        "src/instrumentation.ts",
        "**/__mocks__/**",
        // BE
        "src/app/*",
        "src/lib/be/*",
      ],
      ignoreEmptyLines: true,
      reporter: ["text", "json-summary", "json"],
      reportsDirectory: `${configDefaults.coverage.reportsDirectory}/frontend`,
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
