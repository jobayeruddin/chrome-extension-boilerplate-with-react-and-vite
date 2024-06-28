console.log("Hello from Service Worker");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.forContentScript) {
    (async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
      });
      console.log("TAB", tab);
      const response = await chrome.tabs.sendMessage(tab.id, { ...message });
      // do something with response here, not outside the function
      console.log(response);
    })();
  }
});
