# Simplify - AI-Powered Article Summarizer with Manifest 3

Simplify is a browser extension designed to enhance your online reading experience. It automatically removes unnecessary content from articles and provides you with a concise, AI-generated summary. Save time and focus on what truly matters!

## How it works

- Open a website you want to summarize.
- **Make sure you are logged into your ChatGPT account on your browser or just open it in a different tab.**
- Use the extension while on the article tab.

## Features

- **Content Filtering**: Automatically removes ads, pop-ups, and other irrelevant content.
- **AI-Powered Summarization**: Generates a brief summary of the article using AI.
- **Customizable Settings**: Adjust the level of summarization to suit your needs.
- **Lightweight and Fast**: Minimal impact on your browser's performance.

## Folder Structure

The folder structure is as follows:

```
my-extension/
├── extension/
│   ├── background.js
│   ├── content.js
│   ├── icons/
│   │   ├── icon16.png
│   │   ├── icon48.png
│   │   └── icon128.png
│   ├── popup/
│   │   ├── popup.html
│   │   └── popup.js
│   └── manifest.json
├── src/
│   └── // source files for the extension
├── webpack.config.js
├── babel.config.js
├── package.json
└── node_modules/
    └── // dependencies installed by npm

```

## Getting Started

To edit this extension, follow these steps:

- Clone the repository or download the ZIP file.

  ```bash
  git clone https://github.com/yourusername/simplify.git
  ```

- Edit manifest.json file to add the required information about the extension.
- Customize popup.html as per your needs.
- Add your own JavaScript code in src/index.js.
- Load the extension into your browser:

  - For Chrome / Opera:

    - Go to `chrome://extensions/`
    - Enable "Developer mode"
    - Click "Load unpacked"
    - Selecting the folder that contains the extension files.

  - For Firefox:
    - Go to `about:debugging#/runtime/this-firefox`
    - Click "Load Temporary Add-on"
    - ... (Update)

## Usage

1. Visit any article or some webpage.
2. Click on the Simplify extension icon in your browser's toolbar.
3. The page will automatically filter out unnecessary content and display a summarized version of the article.
4. Customize the summarization settings by clicking on the settings icon within the extension popup.

## Webpack

This boilerplate also includes Webpack, a popular module bundler for JavaScript applications. Webpack is used to bundle all the JavaScript code and dependencies into a single file, making it easier to manage and deploy the code.

In this boilerplate, Webpack is configured to take src/index.js as the entry point and output the bundle to content.js. This means that all the JavaScript code written in src/index.js as well as any dependencies imported into that file will be bundled together into a single file called content.js.

By using Webpack, you can take advantage of its features such as code splitting, hot module replacement, and tree shaking to optimize your code and improve the performance of your extension.

To configure Webpack for your own needs, you can edit the webpack.config.js file included in this boilerplate. You can customize the entry point, output file name, and various other settings to suit your specific requirements.

## NPM Scripts

This boilerplate also includes a set of npm scripts that you can use to build and manage your extension. The following scripts are available:

- `npm run build-dev`: Builds the extension in development mode, using Webpack's development settings.
- `npm run build-prod`: Builds the extension in production mode, using Webpack's production settings for code optimization and minification.
- `npm run clean`: Removes the content.js file. All the other files of the extension are not removed.
- `npm run watch`: Starts a Webpack watch process, automatically rebuilding the extension whenever changes are made to the source files.

These scripts provide a convenient way to build and manage the extension, and can be customized to suit your specific needs. You can also add your own scripts to the package.json file to automate other tasks related to your extension development.

### Contributing

I welcome contributions! Please fork the repository and submit a pull request with your improvements or bug fixes.

1. Fork the repo.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Create a new Pull Request.

   ## Development

After downloading this repo, use `code .` to open it in VS Code. Then, in the terminal, use `npm install`.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
