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
    .should('have.attr', 'src', '/logo.png');
});

given('I logged in as {string}', (userRole) => {
  cy.visit(`http://localhost:3000/login`)
  .get('button').contains(`Login as ${userRole}`)
  .click();
});

given('I click on {string} link', (linkText) => {
    cy.get('a')
    .contains(linkText)
    .click();
});

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

when('I open {string} page', openPage);

when('I see {string} page', (checkPage));

then('I am redirected to {string} page', (checkPage));

then('I see {string} page header', (pageHeader) => {
  cy.get('h1').contains(pageHeader);
})

then('I see list', () => {
  cy.get('li');
});

then ('I see {string} username in app header', (username) => {
  cy.get('h3').contains(username);
});