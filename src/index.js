class ChatGPTExtension {
    constructor() {
        console.log("ChatGPTExtension initialized");
        this.promptInjected = false;
        this.pageContent = '';
        this.handleRequest();
    }

    handleRequest() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log("Content script received message:", request);
            
            if (request.action === "PROMPT") {
                console.log("PROMPT action recognized");
                this.gatherPageContent();
                // Always send a response
                sendResponse({ success: true });
                this.promptToChatGPT();
            }
            
            if (request.action === "PROMPT_PROCEED" && !this.promptInjected) {
                console.log("PROMPT_PROCEED received");
                this.pageContent = request.content;
                this.promptOnChatGPTPage();
                this.promptInjected = true;
                // Always send a response
                sendResponse({ success: true });
            }
            
            // Return true to indicate we'll send a response asynchronously
            return true;
        });
    }

    gatherPageContent() {
        let content = '';
        const article = document.querySelector('article');
        
        if (article) {
            content = article.innerText;
        } else {
            const paragraphs = document.querySelectorAll('p');
            content = Array.from(paragraphs)
                .map(p => p.innerText)
                .filter(text => text.trim().length > 0)
                .join('\n\n');
        }

        this.pageContent = content;
        console.log("Content gathered, length:", this.pageContent.length);
    }
    
    promptToChatGPT() {
        return new Promise((resolve) => {
            chrome.runtime.sendMessage({
                action: "OPEN_CHATGPT",
                content: this.pageContent
            }, (response) => {
                console.log("Got response from background:", response);
                resolve(response);
            });
        });
    }

    async promptOnChatGPTPage() {
        if (!window.location.href.includes("chat.openai.com")) {
            console.error("Not on ChatGPT page");
            return;
        }

        console.log("Waiting for ChatGPT elements...");
        
        const findElements = () => {
            return new Promise((resolve) => {
                let attempts = 0;
                const maxAttempts = 20;
                
                const interval = setInterval(() => {
                    const textarea = document.querySelector('#prompt-textarea');
                    const button = textarea?.closest('form')?.querySelector('button[type="submit"]');
                    
                    if (textarea && button) {
                        clearInterval(interval);
                        resolve({ textarea, button });
                    } else if (attempts >= maxAttempts) {
                        clearInterval(interval);
                        resolve(null);
                    }
                    attempts++;
                }, 500);
            });
        };

        const elements = await findElements();
        
        if (elements) {
            const { textarea, button } = elements;
            console.log("Found ChatGPT elements, injecting prompt...");
            
            // Create and inject the prompt
            const prompt = `Please summarize this text:\n\n${this.pageContent}`;
            
            // Set value and dispatch events
            textarea.value = prompt;
            textarea.dispatchEvent(new Event('input', { bubbles: true }));
            textarea.dispatchEvent(new Event('change', { bubbles: true }));
            
            // Click the button after a short delay
            setTimeout(() => {
                if (!button.disabled) {
                    button.click();
                    console.log("Prompt submitted successfully");
                } else {
                    console.error("Submit button is disabled");
                }
            }, 100);
        } else {
            console.error("Could not find ChatGPT elements");
        }
    }
}

// Initialize the extension
const CGPTExtension = new ChatGPTExtension();