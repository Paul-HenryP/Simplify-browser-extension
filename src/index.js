class ChatGPTExtension {

    constructor() {
        console.log("ChatGPTExtension initialized: index.js"); // Log initialization
        this.promptInjected = false; // Flag to prevent multiple injections
        this.handleRequest();
    }

    handleRequest() {
        chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
            console.log("Message received in content.js:", request); // Log received message
            if (request.action === "PROMPT") {
                console.log("PROMPT action recognized"); // Log action recognition
                this.promptToChatGPT();
            }
            if (request.action === "PROMPT_PROCEED" && !this.promptInjected) {
                console.log("PROMPT PROCEED inject prompt to summarize action recognized"); // Log action recognition
                this.promptOnChatGPTPage();
                this.promptInjected = true; // Set flag to prevent reinjection
            }
        });
    }
    
    promptToChatGPT() {
        console.log("We gathered the info and are prompting to ChatGPT...");
        const prompt = "From now on, if you need to summarize text given to you from an article or a website, write a short summary of the text displayed on the website mentioning the important aspects of that content."; // Get this from the summarizable website
        //Plan:
        //here gathers promptable info from website: index.js
        // Send message to background script to open ChatGPT page
        chrome.runtime.sendMessage({ action: "OPEN_CHATGPT" });
    }

    promptOnChatGPTPage() {
        if (window.location.href === "https://chatgpt.com/") { // Ensure this URL is correct
            console.log("On ChatGPT page, attempting to inject prompt...");
            let retryCount = 0; // Initialize retry counter
            const maxRetries = 20; // Maximum number of retries
            const intervalId = setInterval(() => {
                const input = document.querySelector("textarea");
                const button = document.querySelector("textarea~button");
    
                if (input && button) {
                    const prompt = "From now on, if you need to summarize text given to you from an article or a website, write a short summary of the text displayed on the website mentioning the important aspects of that content.";
                    input.value = prompt;
                    button.click();
                    console.log("Prompt injected and button clicked.");
                    clearInterval(intervalId); // Stop checking once done
                } else {
                    console.log("Textarea or button not found, retrying...");
                    retryCount++;
                    if (retryCount >= maxRetries) {
                        console.error("Max retries reached. Stopping.");
                        clearInterval(intervalId); // Stop checking after max retries
                    }
                }
            }, 1000); // Retry every 1000ms (1 second)
        } else {
            console.error("Not on ChatGPT page. Current URL:", window.location.href);
        }
    }
}

const CGPTExtension = new ChatGPTExtension();
