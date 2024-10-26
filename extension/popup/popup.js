document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('simplify-btn');
    
    button.addEventListener('click', async () => {
        button.disabled = true;
        
        try {
            // Get the current tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // Inject the content script
            await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            });
            
            // Send the PROMPT message and wait for response
            const response = await chrome.tabs.sendMessage(tab.id, { 
                action: "PROMPT"
            });
            
            if (!response || !response.success) {
                throw new Error('Failed to send prompt');
            }
            
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            button.disabled = false;
        }
    });
});



function simplifyArticle() {
    // Try to select article content first
    let content = document.querySelector('article');
    
    if (!content) {
        // If no article is found, try to get paragraphs
        content = document.querySelectorAll('p');
    } else {
        // If article is found, filter out unnecessary elements
        let unwantedElements = content.querySelectorAll('aside, nav, footer, .ad, .popup, .subscribe, .comments');
        unwantedElements.forEach(el => el.remove());
    }
    
    let textContent = '';
    
    if (content) {
        // Get text based on whether content is a single element or NodeList
        if (content instanceof NodeList) {
            content.forEach(paragraph => {
                textContent += paragraph.innerText + '\n';
            });
        } else {
            textContent = content.innerText;
        }
        
        // Call background script to summarize the text using AI
        chrome.runtime.sendMessage({ text: textContent }, (response) => {
            if (response && response.summary) {
                if (content instanceof NodeList) {
                    // Display the summary in an alert
                    alert(response.summary);
                } else {
                    // Replace original content with the summarized text
                    content.innerText = response.summary;
                    alert(response.summary); // For testing
                }
            } else {
                alert('Failed to get a summary from the background script.');
            }
        });
    } else {
        alert('No relevant content found on this page.');
    }
}
