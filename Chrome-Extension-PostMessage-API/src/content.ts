document.addEventListener("DOMContentLoaded", () => {console.log("Hello from content script")});

//this will listen to the message from the tab and send it to the background script
window.addEventListener("message", (event) => {
  if (event.source !== window || !event.data.type) return;
  const {type, data} = event.data;
  if (type === "FROM_TAB") {
    chrome.runtime.sendMessage({ type: "FROM_TAB", data });
  }
});

//this will listen to the message from the background script and send it to the tab
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { type, data } = message;
  if (message.type === "TO_TAB") {
    console.log("content script sending message to tab", message.data);
    window.postMessage({type:'FROM_CONTENT', data}, '*');
  }
});
