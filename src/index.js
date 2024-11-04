// Character limit.
const CHARACTER_LIMIT = 1000;

function getPageText() {
  // Gets all visible text from the page.
  let text = document.body.innerText || document.body.textContent;
  return text.slice(0, CHARACTER_LIMIT); // Trims text to the character limit.
}

// Sends the text to the background script.
chrome.runtime.sendMessage({ action: 'getSummary', text: getPageText() });
