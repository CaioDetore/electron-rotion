import path from "node:path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  main: {
    plugins: [tsconfigPaths(), externalizeDepsPlugin()],
    publicDir: path.resolve(__dirname, "resources"),
  },
  preload: {
    resolve: {
      alias: {
        "@shared": path.resolve(__dirname, "src/shared"),
        "@": path.resolve(__dirname, "src")
      }
    },
    plugins: [tsconfigPaths(), externalizeDepsPlugin()],
  },
  renderer: {
    define: {
      "process.platform": JSON.stringify(process.platform),
    },
    resolve: {
      alias: {
        "@renderer": path.resolve(__dirname, "src/renderer/src"),
        "@shared": path.resolve(__dirname, "src/shared"),
        "@": path.resolve(__dirname, "src"),
      },
    },
    plugins: [
      tsconfigPaths(), // lê aliases do tsconfig
      react(),
      tailwindcss(),
    ],
  },
});
