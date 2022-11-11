import css from "@henrikjoreteg/rollup-plugin-css";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { readdirSync } from "fs";
import { parse } from "path";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import scss from "rollup-plugin-scss";
import svelte from "rollup-plugin-svelte";
import svelteConfig from "./svelte.config.js";

function readAllFiles(folder) {
  let files = [];
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

const outputDir = "dist";

const inputs = [
  "src/background.ts",
  "src/fullScreenToggle/fullScreenToggle.ts",
  "src/singleVerticalScrollbar.scss",
];

const staticFiles = ["static/*"];

const firstRunPlugins = [del({ targets: outputDir + "/*" })];

const lastRunPlugins = [
  {
    name: "watch-additional-files",
    buildStart() {
      for (const file of readAllFiles("static")) {
        this.addWatchFile(file);
      }
    },
  },
  copy({
    targets: staticFiles.map((file) => ({ src: file, dest: outputDir })),
  }),
  del({
    hook: "writeBundle",
    targets: inputs
      .filter((f) => f.endsWith(".scss"))
      .map((f) => outputDir + "/" + parse(f).name + ".js"),
  }),
];

export default inputs.map((file, index) => {
  let plugins = [
    scss({ outputStyle: "compressed" }),
    svelte({ preprocess: svelteConfig.preprocess }),
    css({ minify: true }),
    nodeResolve(),
    terser(),
    typescript(),
  ];
  if (index === 0) {
    plugins = firstRunPlugins.concat(plugins);
  } else if (index === inputs.length - 1) {
    plugins = plugins.concat(lastRunPlugins);
  }

  return {
    input: file,
    output: {
      file: outputDir + "/" + parse(file).name + ".js",
    },
    plugins: plugins,
  };
});
