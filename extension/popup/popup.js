document.getElementById('simplify-btn').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            function: simplifyArticle
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
        });
    } else {
        alert('No article found on this page.');
    }
}
