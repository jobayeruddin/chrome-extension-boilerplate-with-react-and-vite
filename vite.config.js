import fs from "fs";
import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import PluginGenerateFile from "vite-plugin-generate-file";

let dirname = path.resolve(__dirname);

export default defineConfig(
  async ({ command, mode, isSsrBuild, isPreview }) => {
    const manifestPath = dirname + "/manifest.json";
    let manifest = await JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

    let { CSArray, inputEntries } =
      await generateContentScriptAndInputEntries();
    manifest = { ...manifest, content_scripts: CSArray };

    let inputEntryKeys = Object.keys(inputEntries);
    // console.log(inputEntries);

    let globalConfig = {
      base: "./",
    };
    let build = {
      cssCodeSplit: false,
      minify: false,
      rollupOptions: {
        watch: {
          // include: ["src/**", "src/background.js"],
          chokidar: {
            path: "src/background.js",
          },
        },

        input: {
          "src/popup/main": dirname + "/src/popup/index.html",
          background: dirname + "/src/background.js",
          ...inputEntries,
        },
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "assets/index.[ext]",
        },
        plugins: [
          {
            name: "post-build",
            renderChunk: async (code, chunk) => {
              if (inputEntryKeys.includes(chunk.name)) {
                code = code.replace(/import[\s\S]*?;/gm, "");
              }
              return code;
            },
          },
        ],
      },
    };

    if (mode === "development") {
      // dev specific config
      manifest = { ...manifest, name: manifest.name + " (dev)" };
      build = { ...build, outDir: "dev" };
    } else if (mode === "production") {
      // build specific config
      build = {
        ...build,
        outDir: "dist",
      };
    }
    console.log("BUILD", build);

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
          // {
          //   type: "template",
          //   output: "./background.js",
          //   template: "./src/background.js",
          // },
        ]),
      ],
    };
  }
);
let getDirec = (path) => {
  let files = fs.readdirSync(path);
  files = files.filter((file) => fs.statSync(`${path}/${file}`).isDirectory());
  return files;
};

let generateContentScriptAndInputEntries = async () => {
  let CSArray = [];
  let inputEntries = {};
  const CSPath = dirname + "/src/content_scripts";

  let CSDirectories = getDirec(CSPath);
  for (let eachDirectory of CSDirectories) {
    const configPath = CSPath + "/" + eachDirectory + "/config.json";
    let config = await JSON.parse(fs.readFileSync(configPath, "utf-8"));
    CSArray.push({
      matches: typeof config.URL == "string" ? [config.URL] : config.URL,
      js: ["./react-bundle.js", `./cs/${eachDirectory}.js`],
      css: ["./assets/index.css"],
      run_at: "document_end",
    });
    if (fs.existsSync(`${CSPath}/${eachDirectory}/index.js`)) {
      inputEntries[
        `cs/${eachDirectory}`
      ] = `${CSPath}/${eachDirectory}/index.js`;
      // Do something
    } else if (fs.existsSync(`${CSPath}/${eachDirectory}/index.jsx`)) {
      inputEntries[
        `cs/${eachDirectory}`
      ] = `${CSPath}/${eachDirectory}/index.jsx`;
    }
  }

  return { CSArray, inputEntries };
};
