/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ChatGPTExtension = /*#__PURE__*/function () {
  function ChatGPTExtension() {
    _classCallCheck(this, ChatGPTExtension);
    console.log("ChatGPTExtension initialized: index.js"); // Log initialization
    this.promptInjected = false; // Flag to prevent multiple injections
    this.handleRequest();
  }
  _createClass(ChatGPTExtension, [{
    key: "handleRequest",
    value: function handleRequest() {
      var _this = this;
      chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log("Message received in content.js:", request); // Log received message
        if (request.action === "PROMPT") {
          console.log("PROMPT action recognized"); // Log action recognition
          _this.promptToChatGPT();
        }
        if (request.action === "PROMPT_PROCEED" && !_this.promptInjected) {
          console.log("PROMPT PROCEED inject prompt to summarize action recognized"); // Log action recognition
          _this.promptOnChatGPTPage();
          _this.promptInjected = true; // Set flag to prevent reinjection
        }
      });
    }
  }, {
    key: "promptToChatGPT",
    value: function promptToChatGPT() {
      console.log("We gathered the info and are prompting to ChatGPT...");
      var prompt = "From now on, if you need to summarize text given to you from an article or a website, write a short summary of the text displayed on the website mentioning the important aspects of that content."; // Get this from the summarizable website
      //Plan:
      //here gathers promptable info from website: index.js
      // Send message to background script to open ChatGPT page
      chrome.runtime.sendMessage({
        action: "OPEN_CHATGPT"
      });
    }
  }, {
    key: "promptOnChatGPTPage",
    value: function promptOnChatGPTPage() {
      if (window.location.href === "https://chatgpt.com/") {
        // Ensure this URL is correct
        console.log("On ChatGPT page, attempting to inject prompt...");
        var retryCount = 0; // Initialize retry counter
        var maxRetries = 20; // Maximum number of retries
        var intervalId = setInterval(function () {
          var input = document.querySelector("textarea");
          var button = document.querySelector("textarea~button");
          if (input && button) {
            var prompt = "From now on, if you need to summarize text given to you from an article or a website, write a short summary of the text displayed on the website mentioning the important aspects of that content.";
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
  }]);
  return ChatGPTExtension;
}();
var CGPTExtension = new ChatGPTExtension();
/******/ })()
;
//# sourceMappingURL=content.js.map