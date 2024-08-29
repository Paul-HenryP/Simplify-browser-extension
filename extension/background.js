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
    if (request.action === "OPEN_CHATGPT") {
        chrome.tabs.create({ url: "https://chat.openai.com/" }, (tab) => {
            // Wait for the tab to fully load, then send a message to the content script
            chrome.tabs.onUpdated.addListener(function onUpdated(tabId, changeInfo) {
                if (tabId === tab.id && changeInfo.status === 'complete') {
                    chrome.tabs.sendMessage(tabId, { action: "PROMPT_PROCEED" });
                    chrome.tabs.onUpdated.removeListener(onUpdated);  // Remove listener after completion
                }
            });
        });
    }
});
