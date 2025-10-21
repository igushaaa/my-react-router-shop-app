import { defineConfig } from "vitest/config";
import { reactRouter } from "@react-router/dev/vite";

export default defineConfig({
  plugins: [reactRouter()],
  test: {
    environment: "jsdom",
    setupFiles: ["./app/test-setup.ts"],
    globals: true,
  },
});
