/// <reference types="Cypress" />
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

const openPage = (page) => {
  cy.visit(`/${page}`);
};

const checkPage = (page) => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/${page}`);
};

Given('I open {string} page', openPage);

When('I open {string} page', openPage);

Given('I see {string} page', checkPage);

When('I see {string} page', checkPage);

Then('I am redirected to {string} page', checkPage);

Given('I logged in as {string}', (role) => {
  cy.login(role);
});

Given('I logged in as {string} with waiting for response', (role) => {
  cy.server();
  cy.route('GET', '/api/users/employees').as('getEmployees');
  cy.route('GET', '/api/career-days/**').as('getCareerDay');

  cy.login(role).wait(role === 'Employee' ? '@getCareerDay' : '@getEmployees');
});

Given('I click on {string} link', (linkText) => {
  cy.get('a')
    .contains(linkText)
    .click();
});

When('I click on {string} button', (buttonText) => {
  cy.get('button')
    .contains(buttonText)
    .click();
});

When('I click on {string} link', (linkText) => {
  cy.get('a')
    .contains(linkText)
    .click();
});

When('I see list', () => {
  cy.get('ul div[class^="MuiListItem"]');
});

Then('I see {string} page header', (pageHeader) => {
  cy.get('h4').contains(pageHeader);
});

Then('I see {string} header', (pageHeader) => {
  cy.get('h1').contains(pageHeader);
});

Then('I see list', () => {
  cy.get('li');
});

Then('I see paragraph with {string} message', (message) => {
  cy.get('p').contains(message);
});

Then('I see {string} button', (buttonText) => {
  cy.get('button').contains(buttonText);
});

Then('I click on {string} button', (buttonText) => {
  cy.get('button')
    .contains(buttonText)
    .click();
});

Given('I go to {string} active career day', (name) => {
  cy.server();
  cy.route('GET', '/api/career-days/*').as('getCareerDay');
  cy.route('GET', '/api/objectives/*').as('getObjectives');

  cy.get('a')
    .contains(name)
    .click()
    .wait('@getCareerDay')
    .get('ul')
    .children()
    .first()
    .find('a')
    .click()
    .wait('@getObjectives');
});
