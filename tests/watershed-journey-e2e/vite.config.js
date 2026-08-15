import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import webmotionAssets from "./vite-plugin-webmotion-assets.mjs";

export default defineConfig({
  plugins: [react(), webmotionAssets()],
  server: {
    port: 4192,
    strictPort: true,
  },
});
