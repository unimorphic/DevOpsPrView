import features, { getFeatureStorageValue, type FeatureKey } from "./features";

function getFeatureFileName(
  file: string | boolean,
  extension: string,
  feature: string
): string | null {
  if (typeof file === "string") {
    return file;
  } else if (file === true) {
    return `${feature}/${feature}.${extension}`;
  }
  return null;
}

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.webNavigation.onCommitted.addListener(
  async function (navigation) {
    const currentTab = {
      frameIds: [navigation.frameId],
      tabId: navigation.tabId,
    };

    const storageValues = await chrome.storage.local.get(Object.keys(features));

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
      chrome.scripting.executeScript({
        files: jsFilesIsolated,
        target: currentTab,
        world: "ISOLATED",
      });
    }

    jsFilesMain = jsFilesMain.filter((f) => f !== null);
    if (jsFilesMain.length > 0) {
      chrome.scripting.executeScript({
        files: jsFilesMain,
        target: currentTab,
        world: "MAIN",
      });
    }

    cssFiles = cssFiles.filter((f) => f !== null);
    if (cssFiles.length > 0) {
      chrome.scripting.insertCSS({ files: cssFiles, target: currentTab });
    }
  },
  { url: [{ hostEquals: "dev.azure.com" }] }
);
