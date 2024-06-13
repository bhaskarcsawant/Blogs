//this will listen to the message from the content script and send it to all the active tabs
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const {type, data} = message.data
    if (message.type === 'FROM_TAB') {
      chrome.tabs.query({}, (tabs) => {
        tabs.forEach(tab => {
          if (tab.id && tab.id !== sender.tab?.id) {
            chrome.tabs.sendMessage(tab.id, { type: 'TO_TAB', data  });
          }
        });
      });
    }
  });
  