import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import { externalizeDeps } from "vite-plugin-externalize-deps";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "./lib/index.ts"),
      name: "@io-ipatente/ui",
      fileName: (format) => `index.${format}.js`,
    },
    sourcemap: false,
    emptyOutDir: true,
  },
  plugins: [react(), dts({ rollupTypes: true }), externalizeDeps()],
});
