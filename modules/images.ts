import { defineWxtModule } from "wxt/modules";
import { globSync } from "glob";
import path from "path";

export default defineWxtModule({
  setup(wxt) {
    wxt.hook("build:publicAssets", (wxt, assets) => {
      const rootPath = process.cwd();
      const imagePaths = globSync("./src/entrypoints/*/images/*");

      assets.push(
        ...imagePaths.map((filePath) => ({
          absoluteSrc: path.join(rootPath, filePath),
          relativeDest: filePath
            .replace("images\\", "")
            .replace("src\\entrypoints\\", "assets\\"),
        }))
      );
    });
  },
});
