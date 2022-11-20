import css from "@henrikjoreteg/rollup-plugin-css";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { exec } from "child_process";
import { readdirSync } from "fs";
import { parse } from "path";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import scss from "rollup-plugin-scss";
import svelte from "rollup-plugin-svelte";
import svelteConfig from "./svelte.config.js";

function getInputOutputFile(inputInfo) {
  return (
    outputDir + "/" + inputInfo.outputDir + parse(inputInfo.input).name + ".js"
  );
}

export function readAllFiles(folder, filter) {
  let files = [];
  const children = readdirSync(folder, { withFileTypes: true });
  for (const child of children) {
    const childName = folder + "/" + child.name;
    if (child.isDirectory()) {
      files = files.concat(readAllFiles(childName, filter));
    } else if (!filter || filter(childName)) {
      files.push(childName);
    }
  }

  return files;
}

const outputDir = "dist";

const inputs = [
  { input: "src/background.ts", outputDir: "" },
  { input: "src/codeZoom/codeZoom.ts", outputDir: "codeZoom/" },
  {
    input: "src/fullScreenToggle/fullScreenToggle.ts",
    outputDir: "fullScreenToggle/",
  },
  { input: "src/options/options.ts", outputDir: "options/" },
  {
    input: "src/singleVerticalScrollbar/singleVerticalScrollbar.scss",
    outputDir: "singleVerticalScrollbar/",
  },
  {
    input: "src/trueFullScreen/trueFullScreen.ts",
    outputDir: "trueFullScreen/",
  },
];

const staticFiles = ["src/*/*.html", "src/*/images/*", "static/*"];

const firstRunPlugins = [del({ runOnce: true, targets: outputDir + "/*" })];

const lastRunPlugins = [
  {
    name: "smui-theme",
    buildEnd() {
      function onOutput(ex, output, error) {
        if (output) {
          console.log(output);
        }
        if (error) {
          console.log(error);
        }
      }

      exec(
        '"node_modules/.bin/smui-theme" compile dist/smui.css -i src/theme',
        onOutput
      );
      exec(
        '"node_modules/.bin/smui-theme" compile dist/smui-dark.css -i src/theme/dark',
        onOutput
      );
    },
  },
  {
    name: "watch-additional-files",
    buildStart() {
      for (const file of readAllFiles("static")) {
        this.addWatchFile(file);
      }
      for (const file of readAllFiles("src/theme")) {
        this.addWatchFile(file);
      }
      for (const file of readAllFiles("src", (f) => f.endsWith(".html"))) {
        this.addWatchFile(file);
      }
    },
  },
  copy({
    flatten: false,
    targets: staticFiles.map((file) => ({ src: file, dest: outputDir })),
  }),
  del({
    hook: "writeBundle",
    targets: inputs
      .filter((inputInfo) => inputInfo.input.endsWith(".scss"))
      .map((inputInfo) => getInputOutputFile(inputInfo)),
  }),
];

export default inputs.map((inputInfo, index) => {
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
    input: inputInfo.input,
    output: {
      file: getInputOutputFile(inputInfo),
      format: "iife",
    },
    plugins: plugins,
  };
});
