const ALLOWED_HOST = "gorzdrav.spb.ru";

const updateActionForUrl = (tabId, url) => {
  if (!url) {
    chrome.action.disable(tabId);
    return;
  }

  try {
    const tabUrl = new URL(url);
    if (tabUrl.host === ALLOWED_HOST) {
      chrome.action.enable(tabId);
    } else {
      chrome.action.disable(tabId);
    }
  } catch {
    chrome.action.disable(tabId);
  }
};

const refreshAllTabs = () => {
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach((tab) => {
      updateActionForUrl(tab.id, tab.url);
    });
  });
};

chrome.runtime.onInstalled.addListener(() => {
  refreshAllTabs();
});

chrome.runtime.onStartup.addListener(() => {
  refreshAllTabs();
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateActionForUrl(activeInfo.tabId, tab?.url);
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url) {
    updateActionForUrl(tabId, changeInfo.url);
  }
});
