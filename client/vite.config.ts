import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During local development the backend runs on :4000.
// Requests to /api are proxied so you don't hit CORS issues.
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // On GitHub Pages the site is served from /<repo>/, so the production
  // build must use that base. Local dev stays at "/".
  base: command === "build" ? "/happybirthdaykaviya/" : "/",
  // Transpile down so the bundle runs on older iOS/Android browsers.
  build: {
    target: ["es2019", "safari13", "chrome80", "firefox78", "edge88"],
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
      },
    },
  },
}));
