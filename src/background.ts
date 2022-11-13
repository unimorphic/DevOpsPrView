import features, { getFeatureStorageValue, type FeatureKey } from "./features";

chrome.action.onClicked.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.webNavigation.onCompleted.addListener(
  async function (navigation) {
    const currentTab = {
      frameIds: [navigation.frameId],
      tabId: navigation.tabId,
    };

    const storageValues = await chrome.storage.local.get(Object.keys(features));

    const cssFiles = [];
    const jsFiles = [];
    for (const feature of Object.keys(features) as FeatureKey[]) {
      if (getFeatureStorageValue(feature, storageValues).isEnabled) {
        if (features[feature].css) {
          cssFiles.push(`${feature}.css`);
        }
        if (features[feature].js) {
          jsFiles.push(`${feature}.js`);
        }
      }
    }

    if (jsFiles.length > 0) {
      chrome.scripting.executeScript({
        files: jsFiles,
        target: currentTab,
      });
    }

    if (cssFiles.length > 0) {
      chrome.scripting.insertCSS({
        files: cssFiles,
        target: currentTab,
      });
    }
  },
  { url: [{ hostEquals: "dev.azure.com" }] }
);

export {};
