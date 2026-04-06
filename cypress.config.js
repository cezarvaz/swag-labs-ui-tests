const { defineConfig } = require('cypress');

module.exports = defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,
  screenshotOnRunFailure: true,
  video: false,
  allowCypressEnv: false,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Swag Labs UI Tests',
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: 'https://www.saucedemo.com/',
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config);
    },
  },
  retries: {
    runMode: 1,
    openMode: 0,
  },
});
