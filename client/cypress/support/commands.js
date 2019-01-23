// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

const userCredentials = {
  UnitManager: {
    userName: 'pdziashchenia',
    password: 'password0',
    firstname: 'Pavel',
    lastname: 'Dziashchenia',
  },
  Employee: {
    userName: 'ashimkov',
    password: 'password0',
    firstname: 'Andrey',
    lastname: 'Shimkov',
  },
};

/**
 * Command to login as manager or employee
 */
Cypress.Commands.add('login', role => cy
  .visit('http://localhost:3011/login')
  .get('input[name=Username]')
  .type(userCredentials[role].userName)
  .get('input[name=Password]')
  .type(userCredentials[role].password)
  .get('button')
  .contains('Login')
  .click());

/**
 * Command to check user name
 */
Cypress.Commands.add('getUserFullName', (role) => {
  const user = userCredentials[role];
  return `${user.firstname} ${user.lastname}`;
});

/**
 * Command to reset database
 */
Cypress.Commands.add('resetDB', () => {
  cy.exec('cd ../server && npm run seed:undo && npm run seed');
});

/**
 * Command to reset application data (localStorage, cookie, sessionStorage)
 */
Cypress.Commands.add('resetApplicatonData', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  window.sessionStorage.clear();
});
