/// <reference types="Cypress" />

beforeEach(() => {
  cy.resetApplicatonData();
});

before(() => {
  cy.resetDB();
});
