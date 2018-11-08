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
  'unit manager': {
    email: 'stasevich@mail.com',
    password: 'qwerty',
  },
  employee: {
    email: 'pupkin@mail.com',
    password: 'qwerty',
  },
};

Cypress.Commands.add('login', role => {
  return cy
    .visit(`http://localhost:3001/login`)
    .get(`input[name=email]`)
    .type(userCredentials[role].email)
    .get(`input[name=password]`)
    .type(userCredentials[role].password)
    .get('button')
    .contains(`Login`)
    .click();
});

Cypress.Commands.add('resetDB', () => {
  cy.exec('cd ../server && npm run seed:undo && npm run seed');
});
