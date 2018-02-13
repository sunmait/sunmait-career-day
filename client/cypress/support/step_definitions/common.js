const {given, then} = require('cypress-cucumber-preprocessor');

given('I open {string} page', (page) => {
  cy.visit(`http://localhost:3000/${page}`);
});

given('I see {string} button', (buttonText) => {
  cy.get('button')
    .contains(buttonText);
});