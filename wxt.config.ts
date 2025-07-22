import { defineConfig } from "wxt";
import fs from "fs";

export default defineConfig({
  hooks: {
    "build:before": () => {
      if (fs.existsSync("dist")) {
        fs.rmSync("dist", { recursive: true });
      }
    },
  },
  manifest: {
    action: {
      default_icon: {
        "16": "/logos/logo16.png",
        "32": "/logos/logo32.png",
        "48": "/logos/logo48.png",
        "128": "/logos/logo128.png",
      },
    },
    description:
      "Improves the Azure DevOps pull request (PR) view to make code reviews easier",
    homepage_url: "https://bitbucket.org/unimorphic/azuredevopsprview",
    host_permissions: ["https://dev.azure.com/", "https://*.visualstudio.com/"],
    icons: {
      "16": "/logos/logo16.png",
      "32": "/logos/logo32.png",
      "48": "/logos/logo48.png",
      "128": "/logos/logo128.png",
    },
    name: "Azure DevOps PR View",
    permissions: ["scripting", "storage", "webNavigation"],
    version: "0.7",
  },
  modules: ["@wxt-dev/module-svelte"],
  outDir: "dist",
  publicDir: "static",
  srcDir: "src",
  webExt: {
    disabled: true,
  },
});
