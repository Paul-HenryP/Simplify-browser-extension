chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getText') {
    const text = document.body.innerText.slice(0, 1000); // Limit to 1000 characters
    chrome.runtime.sendMessage({ action: 'sendForSummary', text });
  }
});
