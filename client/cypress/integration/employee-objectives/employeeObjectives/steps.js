/// <reference types="Cypress" />
import { When, Then } from 'cypress-cucumber-preprocessor/steps';

Then('I see information item with {string} text', (text) => {
  cy.get('li').contains(text);
});

Then('I see {string} header with {string} text', (header, text) => {
  cy.get(header).contains(text);
});

Then('I see {string} form input label', (labelText) => {
  cy.get('label').contains(labelText);
});

When('I click on {string} expansion panel', (panelText) => {
  cy.get('div')
    .contains(panelText)
    .click();
});
