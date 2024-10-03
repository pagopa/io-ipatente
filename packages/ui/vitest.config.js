import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./vitest.setup.js",
    coverage: {
      include: ["lib/**/*.{ts,tsx}"],
      exclude: ["**/__tests__"],
      reporter: ["text", "html"],
    },
  },
});
