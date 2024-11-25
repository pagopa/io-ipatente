import { loadEnv } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        ...configDefaults.coverage.exclude,
        "**/__tests__",
        "src/generated/**",
        "src/app/api/auth/mocks/**",
        // FE
        "src/common/*",
        "src/hooks/*",
      ],
      ignoreEmptyLines: true,
      include: ["src/**/*.ts"],
      reporter: ["text", "html"],
      reportsDirectory: `${configDefaults.coverage.reportsDirectory}/backend`,
    },
    env: loadEnv("test", process.cwd(), ""),
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
