/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getText') {
    const text = document.body.innerText.slice(0, 1000); // Limit to 1000 characters
    chrome.runtime.sendMessage({
      action: 'sendForSummary',
      text
    }, () => {
      if (chrome.runtime.lastError) {
        console.error("Error sending message to background:", chrome.runtime.lastError.message);
      }
    });

    // Optionally sends a response back to the popup if needed.
    sendResponse({
      status: 'textSent'
    });
  }
  return true; // Ensures sendResponse works asynchronously.
});
/******/ })()
;
//# sourceMappingURL=content.js.map