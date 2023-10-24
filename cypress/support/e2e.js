import './commands';

/* eslint-disable no-unused-vars */
Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});
