chrome.webNavigation.onCompleted.addListener(
  function (navigation) {
    const currentTab = {
      frameIds: [navigation.frameId],
      tabId: navigation.tabId,
    };

    chrome.scripting.executeScript({
      files: ["fullScreenToggle.js"],
      target: currentTab,
    });

    chrome.scripting.insertCSS({
      files: ["fullScreenToggle.css", "singleScrollbar.css"],
      target: currentTab,
    });
  },
  { url: [{ hostEquals: "dev.azure.com" }] }
);

export {};
