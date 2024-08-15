chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // Use an AI service API to summarize the text (e.g., OpenAI, Hugging Face)
    const apiKey = 'your-api-key';
    const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const prompt = `Summarize the following text:\n\n${request.text}`;
    
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 150
        })
    })
    .then(response => response.json())
    .then(data => {
        sendResponse({ summary: data.choices[0].text.trim() });
    })
    .catch(error => console.error('Error summarizing article:', error));

    return true;  // Indicates that the response will be sent asynchronously
});
