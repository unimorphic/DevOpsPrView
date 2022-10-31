import { svelte } from "@sveltejs/vite-plugin-svelte";
import { readdirSync } from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";

function readAllFiles(folder: string): string[] {
  let files: string[] = [];
  const children = readdirSync(folder, { withFileTypes: true });
  for (const child of children) {
    const childName = folder + "/" + child.name;
    if (child.isDirectory()) {
      files = files.concat(readAllFiles(childName));
    } else {
      files.push(childName);
    }
  }

  return files;
}

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        background: resolve(__dirname, "src/background.ts"),
        fullScreenToggle: resolve(__dirname, "src/fullScreenToggle.ts"),
        singleScrollbar: resolve(__dirname, "src/singleScrollbar.scss"),
      },
      output: {
        assetFileNames: "[name].[ext]",
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [
    {
      name: "watch-static",
      buildStart() {
        for (const file of readAllFiles(resolve(__dirname, "static"))) {
          this.addWatchFile(file);
        }
      },
    },
    svelte(),
  ],
  publicDir: "static",
});
