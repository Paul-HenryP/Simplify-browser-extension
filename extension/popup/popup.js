document.addEventListener('DOMContentLoaded', () => {
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'displaySummary') {
      displaySummary(request.summary);
    }
  });
});

function displaySummary(summary) {
  const summaryElement = document.getElementById('summary');
  summaryElement.textContent = summary;
}
