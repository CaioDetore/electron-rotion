import path from "node:path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "fs-extra";

function copyResourcesPlugin() {
  return {
    name: "copy-resources",
    apply(_: any, env: { command: string; }) {
      return env.command === "build"; // ← só roda no build
    },
    async closeBundle() {
      const src = path.resolve(__dirname, "resources");
      const dest = path.resolve(__dirname, "out", "resources");

      if (await fs.pathExists(src)) {
        await fs.copy(src, dest);
        console.log("✅ Copiado: pasta 'resources' →", dest);
      } else {
        console.warn("⚠️ Pasta 'resources' não encontrada:", src);
      }
    },
  };
}


export default defineConfig({
  main: {
    plugins: [tsconfigPaths(), externalizeDepsPlugin(), copyResourcesPlugin()],
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
