console.log("Hello from Service Worker");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   if (message.message === "ChangeBackgroundColor") {
  //     // Change the background color of the webpage (using chrome.tabs API)
  //     chrome.tabs.executeScript(null, {
  //       code: `document.body.style.backgroundColor = "${message.data}";`,
  //     });
  //   }
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
