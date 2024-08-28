

class ChatGPTExtension{

    constructor(){
        console.log("ChatGPTExtension initialized"); // Log initialization
        this.handleRequest()
    }

    handleRequest(){
        chrome.runtime.onMessage.addListener((request, sender, response) => {
            console.log("Message received in content.js:", request); // Log received message
            if (request.action == "PROMPT") 
                console.log("PROMPT action recognized"); // Log action recognition
                this.promptToChatGPT()
        })
    }
    
    promptToChatGPT() {
        console.log("We are propting to chatgpt...")
        const prompt = "From now on, if you need to summarize text given to you from and article or a website, write a short summary of the text displayed on the website mentioning the important  aspects of that content."

        const input = document.querySelector("textarea")
        input.value = prompt
        document.querySelector("textarea~button").click()
    }

}

const CGPTExtension = new ChatGPTExtension()