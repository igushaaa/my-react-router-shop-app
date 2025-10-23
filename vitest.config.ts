import { defineConfig } from "vitest/config";
// Removed reactRouter plugin to avoid type mismatch errors during tsc

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./app/test-setup.ts"],
    globals: true,
  },
  // Ensure Vite version alignment by delegating to root Vite types
  resolve: {
    conditions: [],
  },
});
