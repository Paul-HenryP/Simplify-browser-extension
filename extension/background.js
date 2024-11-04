chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'summarize') {
    callOpenRouterAPI(request.text).then(summary => sendResponse({ summary }));
    return true; // Indicates you’ll send a response asynchronously
  }
});

async function callOpenRouterAPI(text) {
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${KEY}`, /*for testing*/
    },
    body: JSON.stringify({
      model: 'openai/gpt-3.5-turbo',
      messages: [
        { role: 'user', content: `Summarize this: ${text}` }
      ]
    })
  });
  const data = await response.json();
  return data;
}
