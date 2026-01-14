import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: '/jobVacancyWebsite/',
  server: {
    proxy: {
      "/hh": {
        target: "https://api.hh.ru",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/hh/, ""),
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    globals: true,
  },
});
