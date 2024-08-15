# Simplify - AI-Powered Article Summarizer

Simplify is a browser extension designed to enhance your online reading experience. It automatically removes unnecessary content from articles and provides you with a concise, AI-generated summary. Save time and focus on what truly matters!

## Features

- **Content Filtering**: Automatically removes ads, pop-ups, and other irrelevant content.
- **AI-Powered Summarization**: Generates a brief summary of the article using AI.
- **Customizable Settings**: Adjust the level of summarization to suit your needs.
- **Lightweight and Fast**: Minimal impact on your browser's performance.

## Installation

1. Clone this repository:
    ```bash
    git clone https://github.com/yourusername/simplify.git
    ```

2. Navigate to the extension directory:
    ```bash
    cd simplify
    ```

3. Load the extension into your browser:
    - For Chrome: 
      - Go to `chrome://extensions/`
      - Enable "Developer mode"
      - Click "Load unpacked"
      - Select the `simplify` directory

    - For Firefox:
      - Go to `about:debugging#/runtime/this-firefox`
      - Click "Load Temporary Add-on"
      - Select the `manifest.json` file in the `simplify` directory

## Usage

1. Visit any article or webpage.
2. Click on the Simplify extension icon in your browser's toolbar.
3. The page will automatically filter out unnecessary content and display a summarized version of the article.
4. Customize the summarization settings by clicking on the settings icon within the extension popup.

## Development

### Prerequisites

- Basic knowledge of JavaScript, HTML, and CSS
- Familiarity with browser extension development
- An API key from an AI service (e.g., OpenAI, Hugging Face) for the summarization feature

### Contributing

We welcome contributions! Please fork the repository and submit a pull request with your improvements or bug fixes. 

1. Fork the repo.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
