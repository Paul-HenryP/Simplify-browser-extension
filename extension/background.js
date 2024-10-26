/* chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "PROMPT") {
        chrome.tabs.create({ url: "https://chat.openai.com/" }, (tab) => {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: injectPrompt,
                args: [request.prompt]
            });
        });
    }
});

function injectPrompt(prompt) {
    const input = document.querySelector("textarea");
    if (input) {
        input.value = prompt;
        const button = document.querySelector("textarea~button");
        if (button) {
            button.click();
        } else {
            console.error("Button not found");
        }
    } else {
        console.error("Textarea not found");
    }
}
 */

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Background received message:", request);
    
    if (request.action === "OPEN_CHATGPT") {
        // Store content temporarily
        const pageContent = request.content;
        
        // Create new tab and handle response
        chrome.tabs.create({ url: "https://chat.openai.com/" }, (tab) => {
            // Set up listener for tab loading
            const listener = (tabId, changeInfo) => {
                if (tabId === tab.id && changeInfo.status === 'complete') {
                    // Remove listener first
                    chrome.tabs.onUpdated.removeListener(listener);
                    
                    // Wait a bit for the page to fully initialize
                    setTimeout(() => {
                        chrome.scripting.executeScript({
                            target: { tabId: tab.id },
                            files: ['content.js']
                        }).then(() => {
                            chrome.tabs.sendMessage(tab.id, {
                                action: "PROMPT_PROCEED",
                                content: pageContent
                            });
                        });
                    }, 1000);
                }
            };
            
            chrome.tabs.onUpdated.addListener(listener);
        });
        
        // Send response immediately
        sendResponse({ success: true });
    }
    // Return true to indicate we'll send a response asynchronously
    return true;
});

