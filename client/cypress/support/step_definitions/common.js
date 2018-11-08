let openPage = page => {
  cy.visit(`/${page}`);
};

let checkPage = page => {
  cy.url().should('eq', `${Cypress.config().baseUrl}/${page}`);
};

before(() => {
  cy.resetDB();
});

given('I open {string} page', openPage);

given('I see {string} page', checkPage);

given('I see {string} button', buttonText => {
  cy.get('button').contains(buttonText);
});

given('I see logo in app header', () => {
  cy.get('img').should('have.attr', 'src', '/logo.svg');
});

given('I logged in as {string}', role => {
  cy.login(role);
});

given('I logged in as {string} with waiting for response', role => {
  cy.server();
  cy.route('GET', '/api/users/employees').as('getEmployees');
  cy.route('GET', '/api/career-days/**').as('getCareerDay');

  cy.login(role).wait(role === 'employee' ? '@getCareerDay' : '@getEmployees');
});

given('I click on {string} link', linkText => {
  cy.get('a')
    .contains(linkText)
    .click();
});

given('I see paragraph with {string} message', message => {
  cy.get('p').contains(message);
});

given('I see {string} page header', pageHeader => {
  cy.get('h4').contains(pageHeader);
});

when('I click on {string} button', buttonText => {
  cy.get('button')
    .contains(buttonText)
    .click();
});

when('I click on {string} link', linkText => {
  cy.get('a')
    .contains(linkText)
    .click();
});

when('I typing in {string} field: {string}', (fieldName, text) => {
  cy.get(`input[name=${fieldName}]`).type(text);
});

when('I open {string} page', openPage);

when('I see {string} page', checkPage);

when('I see list', () => {
  cy.get('ul div[class^="MuiListItem"]');
});

then('I am redirected to {string} page', checkPage);

then('I see {string} page header', pageHeader => {
  cy.get('h4').contains(pageHeader);
});

then('I see {string} header', pageHeader => {
  cy.get('h1').contains(pageHeader);
});

then('I see list', () => {
  cy.get('li');
});

then('I see {string} username in app header', username => {
  cy.get('.header-bar-username').contains(username);
});

then('I see paragraph with {string} message', message => {
  cy.get('p').contains(message);
});

then('I see {string} button', buttonText => {
  cy.get('button').contains(buttonText);
});

then('I see {string} form input label', labelText => {
  cy.get('label').contains(labelText);
});

then('I click on {string} button', buttonText => {
  cy.get('button')
    .contains(buttonText)
    .click();
});
