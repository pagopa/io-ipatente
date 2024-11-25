import { defineConfig } from "vite";

export default defineConfig({
  test: {
    coverage: {
      exclude: ["**/__tests__", "**/index.ts"],
      include: ["lib/**/*.ts"],
      reporter: ["text", "html", "json-summary", "json"],
    },
    globals: true,
    typecheck: {
      ignoreSourceErrors: true,
    },
  },
});
