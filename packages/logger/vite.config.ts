import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  build: {
    emptyOutDir: true,
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      fileName: (format) => `index.${format}.js`,
      name: "@io-ipatente/logger",
    },
    sourcemap: false,
  },
  plugins: [dts({ rollupTypes: true }), externalizeDeps()],
});
