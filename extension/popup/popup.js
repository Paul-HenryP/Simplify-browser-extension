document.getElementById('simplify-btn').addEventListener('click', () => {
  // Sends a message to the content script to gather text.
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getText' });
  });
});

// Listens for the summarized text from the background script.
chrome.runtime.onMessage.addListener((message) => {
  if (message.action === 'displaySummary') {
    displaySummary(message.summary);
  }
});

function displaySummary(summary) {
  const appDiv = document.getElementById('app');
  appDiv.innerHTML = `<h2>Simplified Text</h2><p>${summary}</p>`;
}
