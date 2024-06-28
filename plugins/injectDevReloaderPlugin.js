// injectDevReloaderPlugin.js
import { readFileSync } from "fs";
import { createFilter } from "@rollup/pluginutils";

export function injectDevReloaderPlugin({ include, exclude } = {}) {
  const filter = createFilter(include, exclude);

  return {
    name: "inject-dev-reloader",
    transform(code, id) {
      if (filter(id) && id.endsWith("background.js")) {
        // Use Vite's `import.meta.env.MODE` for environment check
        const devReloaderCode = `
          if (import.meta.env.MODE === 'development') {
            ${readFileSync("src/dev_reloader.js", "utf-8")}
          }
        `;
        return `${devReloaderCode}\n${code}`;
      }
      return code;
    },
  };
}
