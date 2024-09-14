import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "public/manifest.json",
          dest: ".",
        },
      ],
    }),
  ],
  server: {
    host: "0.0.0.0", // Bind to all network interfaces
    port: 5173,
  },
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
});
