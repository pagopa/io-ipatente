import { configDefaults, defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
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
        // FE
        "src/hooks/*",
        "src/layouts/*",
      ],
      extension: configDefaults.coverage.extension
        ?.toString()
        .replace(",.tsx", "")
        .split(","),
      ignoreEmptyLines: true,
      reporter: ["text", "json-summary", "json"],
      reportsDirectory: `${configDefaults.coverage.reportsDirectory}/backend`,
    },
    exclude: [
      ...configDefaults.exclude,
      "./vitest/vitest.setup.react.ts",
      "./vitest/vitest.setup.node.ts",
    ],
    include: ["./src/**/__tests__/*.ts"],
    setupFiles: ["./vitest/vitest.setup.node.ts"],
    typecheck: {
      ignoreSourceErrors: true,
    },
  },
});
