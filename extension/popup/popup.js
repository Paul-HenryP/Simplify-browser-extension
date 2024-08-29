
document.addEventListener('DOMContentLoaded', async () => {
    const [currentTab] = await chrome.tabs.query({active: true, currentWindow: true});

    document.getElementById('simplify-btn').addEventListener('click', async () => {
        //console.log(currentTab); //for testing
        console.log("Prompting from popup.js"); //for testing
        
        await chrome.tabs.sendMessage(currentTab.id, {action: "PROMPT", message: "Prompting to ChatGPT"});

        /* chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            if (request.action === "OPEN_CHATGPT") {
                chrome.tabs.create({ url: "https://chat.openai.com/" }, (tab) => {
                    // Wait for the tab to fully load, then send a message to the content script
                    chrome.tabs.onUpdated.addListener(function onUpdated(tabId, changeInfo) {
                        if (tabId === tab.id && changeInfo.status === 'complete') {
                            chrome.tabs.sendMessage(tabId, { action: "PROMPT PROCEED" });
                            chrome.tabs.onUpdated.removeListener(onUpdated);  // Remove listener after completion
                        }
                    });
                });
            }
        }); */
        
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => { // old idea
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                function: simplifyArticle
            });
        });
    });
});

function simplifyArticle() {
    // Select article content, filter out unnecessary elements
    let article = document.querySelector('article');
    if (article) {
        let unwantedElements = article.querySelectorAll('aside, nav, footer, .ad, .popup, .subscribe, .comments');
        unwantedElements.forEach(el => el.remove());

        // Simplify the remaining text
        let articleText = article.innerText;
        // Call background script to summarize the text using AI
        chrome.runtime.sendMessage({ text: articleText }, (response) => {
            article.innerText = response.summary;
            
            alert(response.summary);// for testing
        });
    } else {
        alert('No article found on this page.');
    }
}
