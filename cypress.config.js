const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message);
          return null;
        }
      });
    },
    baseUrl: 'https://www.google.com',
    experimentalOriginDependencies: true,
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    retries: {
      runMode: 2,
      openMode: 0
    },
    env: {
      amazon_url: 'https://www.amazon.com',
      SHORT_TIMEOUT: 5000,
      MEDIUM_TIMEOUT: 10000,
      LONG_TIMEOUT: 30000
    },
    screenshotOnRunFailure: true,
    trashAssetsBeforeRuns: true
  },
}); 