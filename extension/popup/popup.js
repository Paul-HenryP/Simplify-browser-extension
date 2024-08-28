
document.addEventListener('DOMContentLoaded', async () => {
    const [currentTab] = await chrome.tabs.query({active: true, currentWindow: true});

    document.getElementById('simplify-btn').addEventListener('click', async () => {
        console.log(currentTab); //for testing
        console.log("Prompting"); //for testing
        await chrome.tabs.sendMessage(currentTab.id, {action: "PROMPT", message: "Prompting to ChatGPT"});

        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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
