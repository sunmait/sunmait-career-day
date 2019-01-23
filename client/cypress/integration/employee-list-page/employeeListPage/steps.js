/// <reference types="Cypress" />
import { Then } from 'cypress-cucumber-preprocessor/steps';

Then('I see {string} username in app header', (name) => {
  cy.get('.header-bar-username').contains(name);
});
