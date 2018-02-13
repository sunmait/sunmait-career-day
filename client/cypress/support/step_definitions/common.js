given('I open {string} page', (page) => {
  cy.visit(`http://localhost:3000/${page}`);
});

given('I see {string} button', (buttonText) => {
  cy.get('button')
    .contains(buttonText);
});

when('I click on {string} button', (buttonText) => {
  cy.get('button')
    .contains(buttonText)
    .click();
});

then('I am redirected to {string} page', (page) => {
  cy.url(`http://localhost:3000/${page}`);
});