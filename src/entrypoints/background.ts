import features, { getFeatureStorageValue, type FeatureKey } from "../features";
import OpenOptionsReason from "./options/OpenOptionsReason";

export default defineBackground(() => {
  let openOptionsReason: OpenOptionsReason | null = null;

  function getFeatureFileName(
    file: string | boolean | undefined,
    extension: string,
    feature: string
  ): string | null {
    if (typeof file === "string") {
      return file;
    } else if (file === true) {
      if (extension === "css") {
        return `assets/${feature}.${extension}`;
      }
      return `${feature}.${extension}`;
    }
    return null;
  }

  (browser.browserAction ?? browser.action).onClicked.addListener(() => {
    browser.runtime.openOptionsPage();
  });

  browser.runtime.onInstalled.addListener((details) => {
    const newFeatureVersions = [0.4];

    if (details.reason == "install") {
      openOptionsReason = OpenOptionsReason.install;
      browser.runtime.openOptionsPage();
    } else if (details.reason == "update") {
      const currentVersion = parseFloat(browser.runtime.getManifest().version);
      const previousVersion = parseFloat(details.previousVersion ?? "0");

      if (
        newFeatureVersions.some(
          (v) => currentVersion >= v && previousVersion < v
        )
      ) {
        openOptionsReason = OpenOptionsReason.update;
        browser.runtime.openOptionsPage();
      }
    }
  });

  browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    sendResponse(openOptionsReason);
    openOptionsReason = null;
  });

  browser.webNavigation.onCommitted.addListener(
    async function (navigation) {
      const currentTab = {
        frameIds: [navigation.frameId],
        tabId: navigation.tabId,
      };

      const storageValues = await browser.storage.local.get(
        Object.keys(features)
      );

      let cssFiles = [];
      let jsFilesIsolated = [];
      let jsFilesMain = [];
      for (const feature of Object.keys(features) as FeatureKey[]) {
        if (getFeatureStorageValue<unknown>(feature, storageValues).isEnabled) {
          cssFiles.push(
            getFeatureFileName(features[feature].cssFile, "css", feature)
          );
          jsFilesMain.push(
            getFeatureFileName(features[feature].jsFileMain, "js", feature)
          );
          jsFilesIsolated.push(
            getFeatureFileName(features[feature].jsFileIsolated, "js", feature)
          );
        }
      }

      jsFilesIsolated = jsFilesIsolated.filter((f) => f !== null);
      if (jsFilesIsolated.length > 0) {
        browser.scripting.executeScript({
          files: jsFilesIsolated,
          target: currentTab,
          world: "ISOLATED",
        });
      }

      jsFilesMain = jsFilesMain.filter((f) => f !== null);
      if (jsFilesMain.length > 0) {
        browser.scripting.executeScript({
          files: jsFilesMain,
          target: currentTab,
          world: "MAIN",
        });
      }

      cssFiles = cssFiles.filter((f) => f !== null);
      if (cssFiles.length > 0) {
        browser.scripting.insertCSS({ files: cssFiles, target: currentTab });
      }
    },
    {
      url: [
        { hostEquals: "dev.azure.com" },
        { hostSuffix: ".visualstudio.com" },
      ],
    }
  );
});
