import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import PluginGenerateFile from "vite-plugin-generate-file";

export default defineConfig(
  async ({ command, mode, isSsrBuild, isPreview }) => {
    const filePath = path.resolve(__dirname, "./manifest.json");
    let manifest = await JSON.parse(fs.readFileSync(filePath, "utf-8"));

    let globalConfig = {
      base: "./",
    };
    let build = {};

    if (mode === "development") {
      // dev specific config
      manifest = { ...manifest, name: manifest.name + " (dev)" };
      build = {
        outDir: "dev",
      };
    } else if (mode === "production") {
      // build specific config
      build = {
        outDir: "dist",
      };
    }
    return {
      ...globalConfig,
      build,
      plugins: [
        react(),
        PluginGenerateFile([
          {
            type: "json",
            output: "./manifest.json",
            data: manifest,
          },
        ]),
      ],
    };
  }
);
