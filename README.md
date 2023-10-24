# swag-labs-ui-tests

This repository contains the code for an automated testing suite using Cypress. This README will guide you through the project setup and how to use the provided NPM scripts.

## Prerequisites

Before you get started, make sure you have the following software installed on your machine:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/)

## Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/cezarvaz/swag-labs-ui-tests.git
   cd swag-labs-ui-tests
   ```

2. Install project dependencies:

   ```bash
   npm install
   ```

## Available Scripts

In this project, you can use the following NPM scripts to perform various tasks:

### 1. Linting

You can use ESLint to check and automatically fix coding style issues in your code.

```bash
npm run lint
```

### 2. Preparing Husky

[Husky](https://typicode.github.io/husky) is a tool that enables Git hooks. You need to install it using the following command:

```bash
npm run prepare
```

This will set up Git hooks to run actions like linting and testing before committing or pushing code.

### 3. Open Cypress Test Runner

To interactively run your Cypress tests in the Cypress Test Runner, use the following command:

```bash
npm run open
```

This will open the Cypress Test Runner, where you can select and run individual test cases.

### 4. Running Tests

To run your Cypress tests headlessly in the Chrome browser, use the following command:

```bash
npm test
```

This script will execute your test suite in Chrome without any graphical interface and report the results in the terminal.