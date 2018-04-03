let openPage = (page) => {
  cy.visit(`http://localhost:3000/${page}`);
};

let checkPage = (page) => {
  cy.url().should('eq', `http://localhost:3000/${page}`);
}

given('I open {string} page', openPage);

given('I see {string} page', (checkPage));

given('I see {string} button', (buttonText) => {
  cy.get('button')
    .contains(buttonText);
});

given('I see logo in app header', () => {
  cy.get('img')
    .should('have.attr', 'src', '/logo.svg');
});

given('I logged in as {string}', () => {
  cy.visit(`http://localhost:3000/login`)
  .get('button').contains(`Login`)
  .click();
});

given('I click on {string} link', (linkText) => {
    cy.get('a')
    .contains(linkText)
    .click();
});

given('I see paragraph with {string} message',(message) => {
  cy.get('p').contains(message);
});

given('I see {string} page header', (pageHeader) => {
  cy.get('h1').contains(pageHeader);
})

when('I click on {string} button', (buttonText) => {
  cy.get('button')
    .contains(buttonText)
    .click();
});

when('I click on {string} link', (linkText) => {
  cy.get('a')
    .contains(linkText)
    .click();
});

when('I typing in {string} field: {string}',(fieldName,text) => {
  cy.get(`input[name=${fieldName}]`)
    .type(text);
});

when('I open {string} page', openPage);

when('I see {string} page', (checkPage));

when('I see list', () => {
  cy.get('li');
});

then('I am redirected to {string} page', (checkPage));

then('I see {string} page header', (pageHeader) => {
  cy.get('h1').contains(pageHeader);
})

then('I see {string} header', (pageHeader) => {
  cy.get('h1').contains(pageHeader);
})

then('I see list', () => {
  cy.get('li');
});

then ('I see {string} username in app header', (username) => {
  cy.get('h3').contains(username);
});

then('I see paragraph with {string} message',(message) => {
  cy.get('p').contains(message);
});

then('I see {string} button', (buttonText) => {
  cy.get('button')
    .contains(buttonText);
});

then('I see {string} form input label', (labelText) => {
  cy.get('label')
    .contains(labelText);
});

then('I click on {string} button', (buttonText) => {
  cy.get('button')
    .contains(buttonText)
    .click();
});
