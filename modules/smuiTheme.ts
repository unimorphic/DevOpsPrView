import { defineWxtModule } from "wxt/modules";
import fs from "fs";
import { execFileSync } from "child_process";

function compileTheme(): void {
  if (!fs.existsSync("generated")) {
    fs.mkdirSync("generated");
  }

  execFileSync(
    '"node_modules/.bin/smui-theme"',
    ["compile", "generated/smui.css", "-i src/theme"],
    { shell: true, stdio: "ignore" }
  );

  execFileSync(
    '"node_modules/.bin/smui-theme"',
    ["compile", "generated/smui-dark.css", "-i src/theme/dark"],
    { shell: true, stdio: "ignore" }
  );
}

export default defineWxtModule({
  setup(wxt) {
    wxt.hook("build:before", async (wxt) => {
      compileTheme();

      if (wxt.config.command === "serve") {
        fs.watch("src/theme/_smui-theme.scss", () => compileTheme());
        fs.watch("src/theme/dark/_smui-theme.scss", () => compileTheme());
      }
    });
  },
});
