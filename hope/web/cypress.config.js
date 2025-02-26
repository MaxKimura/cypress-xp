require('dotenv').config()

const { defineConfig } = require("cypress")
const { configurePlugin } = require("cypress-mongodb")

const { configureAllureAdapterPlugins } = require('@mmisty/cypress-allure-adapter/plugins')


module.exports = defineConfig({
  watchForFileChanges: false,
  e2e: {
    setupNodeEvents(on, config) {
      configureAllureAdapterPlugins(on, config);
      configurePlugin(on);
      return config;
    },
    specPattern: [
      './cypress/support/hooks/index.cy.js',
      './cypress/e2e/**'
    ],
    baseUrl: process.env.BASE_URL,
    
    env: {
      allure: true,
      baseApi: process.env.BASE_API,
      mongodb: {
        uri: process.env.MONGO_URI,
        database: process.env.DATABASE_NAME,
      }
    }
  },
});

// allure serve para rodar