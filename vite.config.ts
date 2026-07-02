import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/kardex-quininde/",
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Kardex Quinindé",
        short_name: "Kardex",
        description: "Consulta de kardex de inventario",
        start_url: "/kardex-quininde/",
        display: "standalone",
        background_color: "#f9fafb",
        theme_color: "#f9fafb",
        icons: [
          {
            src: "/kardex-quininde/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/kardex-quininde/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg}"],
      },
    }),
  ],
});
