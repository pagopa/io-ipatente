import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      exclude: ["**/__tests__"],
      include: ["lib/**/*.{ts,tsx}"],
      reporter: ["text", "html", "json-summary", "json"],
    },
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.js",
  },
});
