/// <reference types="Cypress" />
import { When, Then } from 'cypress-cucumber-preprocessor/steps';

When('I click on career day with {string} id', (id) => {
  cy.get(`ul div[role="button"][id="${id}"]`)
    .first()
    .click();
});

When('I click on delete icon of archived career day', () => {
  cy.get('ul')
    .children()
    .within(() => {
      cy.get('button:enabled svg[name = delete-icon]')
        .first()
        .click();
    });
});

When('I see {string} modal', (modalHeader) => {
  cy.get('h2').contains(modalHeader);
});

Then('I see {string} modal', (modalHeader) => {
  cy.get('h2').contains(modalHeader);
});

When('I click on delete icon near the archived career day with date {string}', (date) => {
  cy.get('ul')
    .children()
    .within(() => {
      cy.get('div')
        .contains(date)
        .parent()
        .parent()
        .within(() => {
          cy.get('svg[name = delete-icon]').click();
        });
    });
});

Then('I click on {string} button waiting for delete response', (buttonText) => {
  cy.server();
  cy.route('DELETE', '/api/career-days/**').as('deleteCD');

  cy.get('button')
    .contains(buttonText)
    .click()
    .wait('@deleteCD');
});

Then('I did not see day with date {string} in the list', (date) => {
  cy.get('ul')
    .children()
    .get('li')
    .each(($li) => {
      expect($li).to.not.contain(date);
    });
});

Then('I click on {string} button for adding career day', (buttonText) => {
  cy.server();
  cy.route('POST', '/api/career-days').as('addCareerDay');

  cy.get('button[name = popup-add-button]')
    .contains(buttonText)
    .click()
    .wait('@addCareerDay');
});

Then('I see new active career day with current start date', () => {
  const currentDate = Cypress.moment().format('DD.MM.YYYY hh:mm A');
  cy.get('ul div')
    .first()
    .contains(currentDate);
  cy.get('svg[name = active-icon]');
});
