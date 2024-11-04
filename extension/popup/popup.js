document.getElementById('simplify-btn').addEventListener('click', () => {
  // Sends a message to the content script to gather text.
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: 'getText' }, (response) => {
      if (chrome.runtime.lastError) {
        // Logs an error if the content script is not available.
        console.error("Content script not found:", chrome.runtime.lastError.message);
        
        // Displays a user-friendly error message in the popup.
        const appDiv = document.getElementById('app');
        appDiv.innerHTML = "<p>Failed to connect. Please ensure you're on a supported webpage.</p>";
      }
    });
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
